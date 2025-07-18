package com.ems.project.payload;

import com.ems.project.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long userId;
    private String username;
    private String email;
    private String city;
    private String state;
    private String pinCode;
    private Role role;
}
