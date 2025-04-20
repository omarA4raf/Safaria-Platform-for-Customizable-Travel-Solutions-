package com.safaria.backend.controller;

import com.safaria.backend.DTO.UserInfoDTO;
import com.safaria.backend.DTO.UserLoginDTO;
import com.safaria.backend.entity.*;
import com.safaria.backend.repository.TourProviderRepository;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.safaria.backend.repository.TouristRepository;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/auth/api")
public class LoginController {
    @Autowired
    private TourProviderUserDetailsService providerUserDetailsService;
    @Autowired
    private TouristUserDetailsService touristUserDetailsService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private  DelegatingUserDetailsService delegatingUserDetailsService;

    @Autowired
    private JwtService jwtService;
    @GetMapping("/")
    String sayHello(){
        return "Hello ,World! :) ";
    }

    @PostMapping("/login/tourist")
    public ResponseEntity<?> touristLogin(@RequestParam String email, @RequestParam String password) {
        try {
            UserDetails userDetails = delegatingUserDetailsService.loadUserByUsername("tourist:"+email);
    
            if (!passwordEncoder.matches(password, userDetails.getPassword())) {
                return ResponseEntity.status(401).body("Invalid password");
            }
    
           
            // Tourist tourist = optionalTourist.get();
            // UserInfoDTO dto = new UserInfoDTO(tourist);
    
            // // Generate token with role claim
             String token = jwtService.generateToken(userDetails.getUsername(), "TOURIST");
            // dto.setType("Tourist");
            // dto.setToken(token);
    
            return ResponseEntity.ok(token);
    
        } catch (UsernameNotFoundException ex) {
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception ex) {
            return ResponseEntity.status(500).body("An error occurred: " + ex.getMessage());
        }
    }
    

    
  
    @PostMapping("/login/tourprovider")
public ResponseEntity<?> tourProviderLogin(@RequestParam String email, @RequestParam String password) {
    try {
        // Load user details based on email
        UserDetails userDetails = delegatingUserDetailsService.loadUserByUsername("provider:"+email);

        // Check if password matches
        if (!passwordEncoder.matches(password, userDetails.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        
     

        // Generate JWT token with email and role
        String token = jwtService.generateToken(email, "PROVIDER");
        

        return ResponseEntity.ok(token);

    } catch (UsernameNotFoundException ex) {
        return ResponseEntity.status(404).body("Provider not found");
    } catch (Exception ex) {
        return ResponseEntity.status(500).body("An error occurred: " + ex.getMessage());
    }
}

    // @GetMapping("/getImage")
    // public ResponseEntity<byte[]> getImage() throws IOException {
    //     byte[] image = Files.readAllBytes(Paths.get());
    //     return ResponseEntity.ok()
    //             .contentType(MediaType.IMAGE_JPEG)
    //             .body(image);
    // }
    // @GetMapping("/adminlogin/")
    // public ResponseEntity<UserInfoDTO> adminlogin(@RequestBody UserLoginDTO dto) {
    //     return serv.adminlogin(dto.getEmail(),dto.getPassword());
    // }
   
}
