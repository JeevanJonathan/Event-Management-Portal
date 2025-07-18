package com.ems.project.controller;

import com.ems.project.entity.Booking;
import com.ems.project.payload.BookingDTO;
import com.ems.project.repository.BookingRepository;
import com.ems.project.service.BookingService;
import com.ems.project.utils.AuthUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @Autowired
    AuthUtils authUtils;

    @Autowired
    BookingRepository bookingRepository;

    @PostMapping("bookings/vendors/{vendorId}")
    public ResponseEntity<BookingDTO> bookNewVendor(@PathVariable Long vendorId) {
        BookingDTO bookingDTO = bookingService.bookNewVendor(vendorId);
        return new ResponseEntity<>(bookingDTO, HttpStatus.CREATED);
    }

    @GetMapping("bookings")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> bookingDTOS = bookingService.getAllBookings();
        return new ResponseEntity<>(bookingDTOS, HttpStatus.OK);
    }

    @GetMapping("bookigns/users/booking")
    public ResponseEntity<BookingDTO> getBookingsByUserId() {
        String email = authUtils.loggedInUserEmail();
        Booking booking = bookingRepository.findBookingByUserEmail(email);
        Long bookingId = booking.getBookingId();
        BookingDTO bookingDTO = bookingService.getBookingsByUserId(email, bookingId);
        return new ResponseEntity<>(bookingDTO, HttpStatus.OK);
    }

    @DeleteMapping("bookings/{bookingId}/vendors/{vendorId}")
    public ResponseEntity<String> deleteVendorFromBooking(@PathVariable Long bookingId, @PathVariable Long vendorId) {
        String response = bookingService.deleteVendorFromBooking(bookingId, vendorId);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
