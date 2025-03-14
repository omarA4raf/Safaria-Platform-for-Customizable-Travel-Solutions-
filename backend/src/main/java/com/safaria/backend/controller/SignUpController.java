package com.safaria.backend.controller;

import com.safaria.backend.service.*;
import jakarta.validation.Valid;
import org.apache.tomcat.util.http.parser.MediaType;
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
        
            return serv.saveTourist(data);
       
    }

    @PostMapping(value="/api/tourguidesignup",consumes = "multipart/form-data")
    public ResponseEntity<String> tourGuideSignUp(@Valid @ModelAttribute TourGuideSignUpDTO data) {
       

            return serv.saveTourGuide(data);
    }

    @PostMapping(value="/api/companysignup",consumes = "multipart/form-data")
    public ResponseEntity<String> companySignUp( @Valid @ModelAttribute  CompanySignUpDTO data) {
       

            return serv.saveCompany(data);
       
    }
}