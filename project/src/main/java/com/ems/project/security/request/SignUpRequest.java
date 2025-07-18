package com.ems.project.security.request;

import com.ems.project.enums.Role;
import lombok.Data;

@Data
public class SignUpRequest {

    private String username;

    private String email;

    private String password;

    private Role role;
}
