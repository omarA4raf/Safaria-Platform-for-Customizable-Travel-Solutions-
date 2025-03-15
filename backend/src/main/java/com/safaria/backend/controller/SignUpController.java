package com.safaria.backend.controller;
import com.safaria.backend.DTO.TourProviderSignUpDTO;
import com.safaria.backend.service.*;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import com.safaria.backend.DTO.TouristSignUpDTO;





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

    /*
    *
    * this api should be edited
    * */
    @PostMapping("/api/tourguidesignup")
    public ResponseEntity<String> tourGuideSignUp(@Valid @RequestBody TourProviderSignUpDTO data) {
       
            return serv.saveTourProvider(data);
        
        // return ResponseEntity.status(200).body("No valid type");

    }

}
