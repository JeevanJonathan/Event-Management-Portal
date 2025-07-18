package com.ems.project.repository;

import com.ems.project.entity.Category;
import com.ems.project.entity.Vendor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VendorRepository extends JpaRepository<Vendor, Long> {
    Page<Vendor> findAll(Specification<Vendor> specification, Pageable pageable);

    Page<Vendor> findByCategory(Category category, Pageable pageable);
}
