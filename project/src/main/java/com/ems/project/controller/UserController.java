package com.ems.project.controller;

import com.ems.project.config.AppConstants;
import com.ems.project.payload.UserDTO;
import com.ems.project.payload.UserResponse;
import com.ems.project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("public/users")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        UserDTO newUser = userService.createUser(userDTO);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @GetMapping("public/users")
    public ResponseEntity<UserResponse> getAllUsers(
            @RequestParam(name = "pageNumber", defaultValue = AppConstants.PAGE_NUMBER, required = false) Integer pageNumber,
            @RequestParam(name = "pageSize", defaultValue = AppConstants.PAGE_SIZE, required = false) Integer pageSize,
            @RequestParam(name = "sortBy", defaultValue = AppConstants.SORT_USER, required = false) String sortBy,
            @RequestParam(name = "sortOrder", defaultValue = AppConstants.SORT_ORDER, required = false) String sortOrder
    ) {
        UserResponse userResponse = userService.getAllUsers(pageNumber, pageSize, sortBy, sortOrder);
        return new ResponseEntity<>(userResponse, HttpStatus.OK);
    }
}
