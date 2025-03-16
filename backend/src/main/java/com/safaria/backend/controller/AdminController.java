package com.safaria.backend.controller;

import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    Iservices serv;
    @GetMapping("/")
    String sayHello(){
        return "Hello ,World! :) ";
    }

    @GetMapping("/getPendingProviders/")
    public Optional<List<TourProvider>> getPendingProviders(){
        return this.serv.getPendingProviders();
    }
    @PostMapping("/deleteTourProvider/")
    public ResponseEntity<String> deleteTourProvider(@PathVariable Integer id){
        return this.serv.deleteTourProvider(id);
    }
    @PostMapping("/approveTourProvider")
    public ResponseEntity<String> approveTourProvider(@PathVariable Integer id){
        return this.serv.approveTourProvider(id);
    }
}
