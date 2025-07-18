package com.ems.project.service;

import com.ems.project.entity.Booking;
import com.ems.project.entity.BookingItem;
import com.ems.project.entity.Vendor;
import com.ems.project.exceptions.APIException;
import com.ems.project.exceptions.ResourceNotFoundException;
import com.ems.project.payload.BookingDTO;
import com.ems.project.payload.VendorDTO;
import com.ems.project.repository.BookingItemRepository;
import com.ems.project.repository.BookingRepository;
import com.ems.project.repository.VendorRepository;
import com.ems.project.utils.AuthUtils;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class BookingServiceImpl implements BookingService{

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingItemRepository bookingItemRepository;

    @Autowired
    private VendorRepository vendorRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AuthUtils authUtils;

    @Override
    public BookingDTO bookNewVendor(Long vendorId) {
        Booking booking = getBooking();

        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new ResourceNotFoundException("Vendor", "id", vendorId));

        BookingItem bookingItem = bookingItemRepository.findBookingItemByVendorIdAndBookingId(
                booking.getBookingId(), vendorId);

        if (bookingItem != null) {
            throw new APIException(vendor.getVendorName() + " already booked");
        }

        if ("Not Available".equalsIgnoreCase(vendor.getVendorName())) {
            throw new APIException(vendor.getVendorName() + " is not available");
        }

        BookingItem newBooking = new BookingItem();
        newBooking.setVendor(vendor);
        newBooking.setBooking(booking);
        newBooking.setVendorPrice(vendor.getVendorPrice());
        bookingItemRepository.save(newBooking);

        booking.setPriceAgreed(booking.getPriceAgreed() + vendor.getVendorPrice());
        bookingRepository.save(booking);

        return modelMapper.map(booking, BookingDTO.class);
    }

    @Override
    public List<BookingDTO> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();

        if (bookings.isEmpty()) {
            throw new APIException("No bookings found");
        }

        List<BookingDTO> bookingDTOS = bookings.stream()
                .map(booking -> {
                    BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
                    List<VendorDTO> vendorDTOS = booking.getBookingItems().stream()
                            .map(vendor -> {
                                VendorDTO vendorDTO = modelMapper.map(vendor.getVendor(), VendorDTO.class);
                                return vendorDTO;
                            }).toList();
                    bookingDTO.setVendors(vendorDTOS);
                    return bookingDTO;
                }).toList();

        return bookingDTOS;
    }

    @Override
    public BookingDTO getBookingsByUserId(String email, Long bookingId) {
        Booking booking = bookingRepository.findBookingByUserEmailAndBookingId(email, bookingId);

        if (booking == null) {
            throw new ResourceNotFoundException("Booking", "id", bookingId);
        }

        BookingDTO bookingDTO = modelMapper.map(booking, BookingDTO.class);
        List<VendorDTO> vendorDTOS = booking.getBookingItems().stream()
                .map(b -> modelMapper.map(b.getVendor(), VendorDTO.class))
                .toList();

        bookingDTO.setVendors(vendorDTOS);
        return bookingDTO;
    }

    @Transactional
    @Override
    public String deleteVendorFromBooking(Long bookingId, Long vendorId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking", "id", bookingId));

        BookingItem bookingItem = bookingItemRepository.findBookingItemByVendorIdAndBookingId(bookingId, vendorId);

        if (bookingItem == null) {
            throw new ResourceNotFoundException("VendorId", "vendorId", vendorId);
        }

        booking.setPriceAgreed(booking.getPriceAgreed() - bookingItem.getVendorPrice());
        bookingItemRepository.deleteBookingItemByVendorIdAndBookingId(bookingId, vendorId);
        return "Vendor " + bookingItem.getVendor().getVendorName() + " has been deleted";
    }


    private Booking getBooking() {
        Booking userBooking = bookingRepository.findBookingByUserEmail(authUtils.loggedInUserEmail());

        if (userBooking != null) return userBooking;

        Booking booking = new Booking();
        booking.setUser(authUtils.loggedInUser());
        booking.setPriceAgreed(0.00);
        return bookingRepository.save(booking);
    }
}
