package com.safaria.backend.controller;

import com.safaria.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.safaria.backend.DTO.TouristSignUpDTO;
import com.safaria.backend.DTO.CompanySignUpDTO;
import com.safaria.backend.DTO.TourGuideSignUpDTO;

@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
@RestController
@Validated
public class SignUpController {

    @Autowired
    private Iservices serv;

    @PostMapping("/api/touristsignup")
    public ResponseEntity<String> touristSignUp(@Valid @RequestBody TouristSignUpDTO data) {
        try {
            return serv.saveTourist(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/api/tourguidesignup")
    public ResponseEntity<String> tourGuideSignUp(@Valid @RequestBody TourGuideSignUpDTO data) {
        try {
            return serv.saveTourGuide(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }

    @PostMapping("/api/companysignup")
    public ResponseEntity<String> companySignUp(@Valid @RequestBody CompanySignUpDTO data) {
        try {
            return serv.saveCompany(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred: " + e.getMessage());
        }
    }
}