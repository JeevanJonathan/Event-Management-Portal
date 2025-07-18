package com.ems.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId;

    private double priceAgreed;

    @OneToOne
    @JoinColumn(name = "columnId")
    private User user;

    @OneToMany(mappedBy = "booking", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, orphanRemoval = true)
    private List<BookingItem> bookingItems = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "vendorId")
    private Vendor vendor;
}
