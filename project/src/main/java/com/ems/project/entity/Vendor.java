package com.ems.project.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vendorId;

    private String vendorName;
    private String vendorEmail;
    private String vendorPhone;
    private String vendorImage;
    private String vendorDescription;
    private Double vendorPrice;
    private String city;
    private String state;
    private Integer serviceQuantity;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @OneToMany(mappedBy = "vendor")
    private List<Booking> bookings = new ArrayList<>();

    @OneToOne(mappedBy = "vendor")
    private BookingItem bookingItem;
}
