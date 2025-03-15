package com.safaria.backend.controller;
import com.safaria.backend.DTO.TourProviderSignUpDTO;
import com.safaria.backend.service.*;
import jakarta.validation.Valid;
import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.safaria.backend.DTO.TourProviderSignUpDTO;
import com.safaria.backend.DTO.TouristSignUpDTO;


@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
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
    @PostMapping("/api/tourguidesignup")
    public ResponseEntity<String> tourGuideSignUp(@Valid @RequestBody TourProviderSignUpDTO data) {
       
            return serv.saveTourProvider(data,true);
        
        // return ResponseEntity.status(200).body("No valid type");

    }
    @PostMapping("/api/companysignup")
    public ResponseEntity<String> companySignUp( @Valid @RequestBody  TourProviderSignUpDTO data) {
       
            return serv.saveTourProvider(data,false);
        
        // return ResponseEntity.status(200).body("No valid type");

    }
}