package com.safaria.backend.controller;

import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    Iservices serv;
    @GetMapping("/")
    String sayHello(){
        return "Hello ,World! :) ";
    }

    @GetMapping("/touristlogin/")
    public Tourist touristlogin(@RequestParam String email, @RequestParam String password) {
        return serv.touristlogin(email,password);
    }
    @GetMapping("/tourguidelogin/")
    public TourGuide tourguidelogin(@RequestParam String email, @RequestParam String password) {
        return serv.tourguidelogin(email, password);
    }
    @GetMapping("/adminlogin/")
    public Admin adminlogin(@RequestParam String email, @RequestParam String password) {
        return serv.adminlogin(email, password);
    }
}
