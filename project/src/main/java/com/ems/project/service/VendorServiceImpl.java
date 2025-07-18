package com.ems.project.service;

import com.ems.project.entity.Category;
import com.ems.project.entity.Vendor;
import com.ems.project.exceptions.ResourceNotFoundException;
import com.ems.project.payload.VendorDTO;
import com.ems.project.payload.VendorResponse;
import com.ems.project.repository.CategoryRepository;
import com.ems.project.repository.VendorRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class VendorServiceImpl implements VendorService{

    @Autowired
    VendorRepository vendorRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    FileService fileService;

    @Value("${project.image}")
    private String path;

    @Value("${image.base.url}")
    private String imageBaseUrl;

    @Override
    public VendorDTO createVendor(VendorDTO vendorDTO, Long cateGoryId) {
        Category category = categoryRepository.findById(cateGoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", cateGoryId));

        Vendor vendor = modelMapper.map(vendorDTO, Vendor.class);
        vendor.setCategory(category);
        Vendor newVendor = vendorRepository.save(vendor);
        return modelMapper.map(newVendor, VendorDTO.class);
    }

    @Override
    public VendorDTO deleteVendor(Long vendorId) {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor with id " + vendorId + " not found"));

        vendorRepository.delete(vendor);
        return modelMapper.map(vendor, VendorDTO.class);
    }

    @Override
    public VendorResponse getAllVendors(String keyword, String category, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Specification<Vendor> specification = Specification.where(null);

        if (keyword != null && !keyword.isEmpty()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("vendorName")), "%" + keyword.toLowerCase() + "%"));
        }

        if (category != null && !category.isEmpty()) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("category").get("categoryName"), category));
        }

        Page<Vendor> page = vendorRepository.findAll(specification, pageable);
        List<Vendor> vendors = page.getContent();

        if (vendors.isEmpty()) throw new RuntimeException("No Vendors found");

        List<VendorDTO> vendorDTOS = vendors.stream()
                .map(
                        vendor -> {
                            VendorDTO vendorDTO = modelMapper.map(vendor, VendorDTO.class);
                            vendorDTO.setVendorImage(constructImageUrl(vendor.getVendorImage()));
                            return vendorDTO;
                        }
                ).toList();

        VendorResponse vendorResponse = new VendorResponse();
        vendorResponse.setVendors(vendorDTOS);
        vendorResponse.setTotalPages(page.getTotalPages());
        vendorResponse.setTotalElements(page.getTotalElements());
        vendorResponse.setPageNumber(page.getNumber());
        vendorResponse.setPageSize(page.getSize());
        vendorResponse.setLastPage(page.isLast());
        return vendorResponse;
    }

    @Override
    public VendorDTO updateVendorImage(Long vendorId, MultipartFile image) throws IOException {
        Vendor vendor = vendorRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor with id " + vendorId + " not found"));

        String fileName = fileService.uploadImage(path, image);
        vendor.setVendorImage(fileName);

        Vendor updatedVendor = vendorRepository.save(vendor);
        return modelMapper.map(updatedVendor, VendorDTO.class);
    }

    @Override
    public VendorResponse getProductsByCategory(Long categoryId, Integer pageNumber, Integer pageSize, String sortBy, String sortOrder) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category with id " + categoryId + " not found"));

        Sort sort = sortOrder.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
        Page<Vendor> vendors = vendorRepository.findByCategory(category, pageable);
        List<Vendor> vendorList = vendors.getContent();

        if (vendorList.isEmpty()) throw new RuntimeException("No Vendors found");

        List<VendorDTO> vendorDTOS = vendorList.stream().map(vendor -> modelMapper.map(vendor, VendorDTO.class))
                .toList();
        VendorResponse vendorResponse = new VendorResponse();
        vendorResponse.setVendors(vendorDTOS);
        vendorResponse.setTotalPages(vendors.getTotalPages());
        vendorResponse.setTotalElements(vendors.getTotalElements());
        vendorResponse.setPageNumber(vendors.getNumber());
        vendorResponse.setPageSize(vendors.getSize());
        vendorResponse.setLastPage(vendors.isLast());
        return vendorResponse;
    }

    private String constructImageUrl(String imageName) {
        return imageBaseUrl.endsWith("/") ? imageBaseUrl + imageName : imageBaseUrl + "/" + imageName;
    }
}
