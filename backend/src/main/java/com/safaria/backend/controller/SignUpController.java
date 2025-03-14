package com.safaria.backend.controller;
import com.safaria.backend.service.*;

import jakarta.validation.Valid;

import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import com.safaria.backend.DTO.TouristSignUpDTO;
import com.safaria.backend.DTO.CompanySignUpDTO;
import com.safaria.backend.DTO.TourGuideSignUpDTO;




@CrossOrigin(origins = "http://localhost:8080")
@RestController
@Validated
public class SignUpController {

    @Autowired
    private Iservices serv;
    @PostMapping("/api/touristsignup")
    public ResponseEntity<String> touristSignUp(@Valid @RequestBody TouristSignUpDTO data) {
        
            return serv.saveTourist(data);
        
        // return ResponseEntity.status(200).body("No valid type");

    }
    @PostMapping(value="/api/tourguidesignup",consumes = "multipart/form-data")
    public ResponseEntity<String> tourGuideSignUp(@Valid @ModelAttribute TourGuideSignUpDTO data) {
       
            return serv.saveTourGuide(data);
        
        // return ResponseEntity.status(200).body("No valid type");

    }
    @PostMapping(value="/api/companysignup",consumes = "multipart/form-data")
    public ResponseEntity<String> companySignUp( @Valid @ModelAttribute  CompanySignUpDTO data) {
       
            return serv.saveCompany(data);
        
        // return ResponseEntity.status(200).body("No valid type");

    }
}
