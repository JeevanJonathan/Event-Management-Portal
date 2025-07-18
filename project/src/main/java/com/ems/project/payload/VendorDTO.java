package com.ems.project.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VendorDTO {
    private Long vendorId;
    private String vendorName;
    private String vendorEmail;
    private String vendorPhone;
    private String vendorImage;
    private String vendorDescription;
    private Double vendorPrice;
    private String categoryId;
    private String city;
    private String state;
    private Integer serviceQuantity;
}
