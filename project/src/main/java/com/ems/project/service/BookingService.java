package com.ems.project.service;

import com.ems.project.payload.BookingDTO;

import java.util.List;

public interface BookingService {
    BookingDTO bookNewVendor(Long vendorId);

    List<BookingDTO> getAllBookings();

    BookingDTO getBookingsByUserId(String email, Long bookingId);

    String deleteVendorFromBooking(Long bookingId, Long vendorId);
}
