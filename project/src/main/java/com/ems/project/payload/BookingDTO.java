package com.ems.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDTO {
    private Long bookingId;
    private double priceAgreed;

    private List<VendorDTO> vendors = new ArrayList<>();
}
