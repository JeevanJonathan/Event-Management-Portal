package com.ems.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingItemId;

    @ManyToOne
    @JoinColumn(name = "bookingId")
    private Booking booking;

    @OneToOne
    @JoinColumn(name = "vendorId")
    private Vendor vendor;

    private Double vendorPrice;
}
