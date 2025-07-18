package com.ems.project.repository;

import com.ems.project.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking findBookingByUserEmail(String userEmail);

    Booking findBookingByUserEmailAndBookingId(String userEmail, Long bookingId);
}
