package com.ems.project.repository;

import com.ems.project.entity.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {

    @Query("SELECT bi FROM BookingItem bi WHERE bi.booking.bookingId = ?1 AND bi.vendor.vendorId = ?2")
    BookingItem findBookingItemByVendorIdAndBookingId(Long bookingId, Long vendorId);

    @Modifying
    @Query("DELETE FROM BookingItem bi WHERE bi.booking.bookingId = ?1 AND bi.vendor.vendorId = ?2")
    void deleteBookingItemByVendorIdAndBookingId(Long bookingId, Long vendorId);
}
