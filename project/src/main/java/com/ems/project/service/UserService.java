package com.ems.project.service;

import com.ems.project.payload.UserDTO;
import com.ems.project.payload.UserResponse;

public interface UserService {
    UserResponse getAllUsers(Integer pageNumber, Integer pageSize, String sortBy, String sortOrder);

    UserDTO createUser(UserDTO userDTO);
}
