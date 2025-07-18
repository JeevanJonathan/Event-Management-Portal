package com.ems.project.controller;

import com.ems.project.config.AppConstants;
import com.ems.project.payload.VendorDTO;
import com.ems.project.payload.VendorResponse;
import com.ems.project.service.VendorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("api")
public class VendorController {

    @Autowired
    VendorService vendorService;

    @PostMapping("public/vendors/{categoryId}")
    public ResponseEntity<VendorDTO> createVendor(@RequestBody VendorDTO vendorDTO, @PathVariable Long categoryId) {
        VendorDTO newVendor = vendorService.createVendor(vendorDTO, categoryId);
        return new ResponseEntity<>(newVendor, HttpStatus.CREATED);
    }

    @GetMapping("public/vendors")
    public ResponseEntity<VendorResponse> getAllVendors(
            @RequestParam(name = "keyword", required = false) String keyword,
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_VENDOR, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        VendorResponse vendorResponse = vendorService.getAllVendors(keyword, category, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(vendorResponse, HttpStatus.OK);
    }

    @PutMapping("admin/vendors/{vendorId}/image")
    public ResponseEntity<VendorDTO> updateVendorImage(@PathVariable Long vendorId,
                                                       @RequestParam(name = "image")MultipartFile image) throws IOException {
        VendorDTO updatedVendor = vendorService.updateVendorImage(vendorId, image);
        return new ResponseEntity<>(updatedVendor, HttpStatus.OK);
    }

    @DeleteMapping("public/vendors/{vendorId}")
    public ResponseEntity<VendorDTO> deleteVendor(@PathVariable Long vendorId) {
        VendorDTO deletedVendor = vendorService.deleteVendor(vendorId);
        return new ResponseEntity<>(deletedVendor, HttpStatus.OK);
    }

    @GetMapping("public/categories/{categoryId}/vendors")
    public ResponseEntity<VendorResponse> getVendorsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_VENDOR, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder) {

        VendorResponse vendorResponse = vendorService.getProductsByCategory(categoryId, pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(vendorResponse, HttpStatus.OK);
    }
}
