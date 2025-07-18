package com.ems.project.controller;

import com.ems.project.entity.User;
import com.ems.project.enums.Role;
import com.ems.project.repository.UserRepository;
import com.ems.project.security.jwt.JwtUtils;
import com.ems.project.security.request.LoginRequest;
import com.ems.project.security.request.SignUpRequest;
import com.ems.project.security.response.LoginResponse;
import com.ems.project.security.response.MessageResponse;
import com.ems.project.security.service.UserDetailsImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Username " + signUpRequest.getUsername() + " already exists"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Email " + signUpRequest.getEmail() + " already exists"));
        }

        User user = new User(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                passwordEncoder.encode(signUpRequest.getPassword())
        );

        Role role = signUpRequest.getRole();

        if (role == null) {
            role = Role.USER;
        } else {
            switch (role) {
                case ADMIN:
                    role = Role.ADMIN;
                    break;

                case VENDOR:
                    role = Role.VENDOR;
                    break;

                default:
                    role = Role.USER;
            }
        }

        user.setRole(role);
        userRepository.save(user);
        return ResponseEntity.ok().body(new MessageResponse("User registered successfully"));
    }

    @PostMapping("login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
        } catch(AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);


        String roleString = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");
        Role role = Role.valueOf(roleString.replace("ROLE_", ""));

        LoginResponse loginResponse = new LoginResponse(userDetails.getId(), userDetails.getUsername(), role);
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString()).body(loginResponse);
    }

    @GetMapping("username")
    public String currentUsername(Authentication authentication) {
        if (authentication != null)
            return authentication.getName();
        else return null;
    }

    @GetMapping("user")
    public ResponseEntity<?> currentUserDetails(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String roleString = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .findFirst()
                .orElse("ROLE_USER");
        Role role = Role.valueOf(roleString.replace("ROLE_", ""));

        LoginResponse loginResponse = new LoginResponse(userDetails.getId(), userDetails.getUsername(), role);
        return ResponseEntity.ok().body(loginResponse);
    }

    @PostMapping("signout")
    public ResponseEntity<?> signOut() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new MessageResponse("Signed out successfully"));
    }
}
