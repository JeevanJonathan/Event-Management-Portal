package com.ems.project.service;

import com.ems.project.payload.CategoryDTO;
import com.ems.project.payload.CategoryResponse;

public interface CategoryService {
    CategoryDTO createCategory(CategoryDTO categoryDTO);

    CategoryResponse getAllCategories(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);
}
