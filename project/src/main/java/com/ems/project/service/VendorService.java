package com.ems.project.service;

import com.ems.project.payload.VendorDTO;
import com.ems.project.payload.VendorResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface VendorService {
    VendorDTO createVendor(VendorDTO vendorDTO, Long categoryId);

    VendorDTO deleteVendor(Long vendorId);

    VendorResponse getAllVendors(String keyword, String category, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    VendorDTO updateVendorImage(Long vendorId, MultipartFile image) throws IOException;

    VendorResponse getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
}
