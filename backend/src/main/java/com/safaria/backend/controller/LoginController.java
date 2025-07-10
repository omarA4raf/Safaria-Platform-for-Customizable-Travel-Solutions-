package com.safaria.backend.controller;

import com.safaria.backend.DTO.CustomUserDetails;
import com.safaria.backend.DTO.UserLoginDTO;
import com.safaria.backend.DTO.UserLoginRecieveDTO;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/auth/api")
public class LoginController {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private DelegatingUserDetailsService delegatingUserDetailsService;
    @Autowired
    private JwtService jwtService;

    @PostMapping("/login/tourist")
    public ResponseEntity<?> touristLogin(@RequestBody UserLoginRecieveDTO userLoginRecieveDTO) {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) delegatingUserDetailsService.loadUserByUsername("tourist:" + userLoginRecieveDTO.getEmail());

            if (!passwordEncoder.matches(userLoginRecieveDTO.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            // // Generate token with role claim
            String token = jwtService.generateToken(userDetails.getUsername(), "TOURIST");

            return ResponseEntity.ok(new UserLoginDTO(token, userDetails.getId(), userDetails.getRole(), userDetails.getName()));

        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred: " + ex.getMessage());
        }
    }

    @PostMapping("/login/tourprovider")
    public ResponseEntity<?> tourProviderLogin(@RequestBody UserLoginRecieveDTO userLoginRecieveDTO) {
        try {
            // Load user details based on email
            CustomUserDetails userDetails = (CustomUserDetails) delegatingUserDetailsService.loadUserByUsername("provider:" + userLoginRecieveDTO.getEmail());

            // Check if password matches
            if (!passwordEncoder.matches(userLoginRecieveDTO.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            // Generate JWT token with email and role
            String token = jwtService.generateToken(userDetails.getUsername(), "PROVIDER");

            return ResponseEntity.ok(new UserLoginDTO(token, userDetails.getId(), userDetails.getRole(), userDetails.getName()));

        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(404).body("Provider not found");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred: " + ex.getMessage());
        }
    }

    @PostMapping("/login/admin")
    public ResponseEntity<?> adminLogin(@RequestBody UserLoginRecieveDTO userLoginRecieveDTO) {
        try {
            CustomUserDetails userDetails = (CustomUserDetails) delegatingUserDetailsService.loadUserByUsername("admin:" + userLoginRecieveDTO.getEmail());

            if (!passwordEncoder.matches(userLoginRecieveDTO.getPassword(), userDetails.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password");
            }

            String token = jwtService.generateToken(userDetails.getUsername(), "ADMIN");

            return ResponseEntity.ok(new UserLoginDTO(token, userDetails.getId(), userDetails.getRole(), userDetails.getName()));

        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred: " + ex.getMessage());
        }
    }

}
