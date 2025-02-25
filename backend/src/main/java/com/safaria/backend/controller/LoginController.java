package com.safaria.backend.controller;

import com.safaria.backend.entity.*;
import com.safaria.backend.service.services;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3306")
@RestController
@RequestMapping("/login")
public class LoginController {
    services serv;
    @GetMapping("/")
    String sayHello(){
        return "Hello ,World! :) ";
    }

    @GetMapping("/touristlogin/{username}/{password}")
    public Tourist touristlogin(@PathVariable String username, @PathVariable String password) {
        return serv.touristlogin(username, password);
    }
    @GetMapping("/tourguidelogin/{username}/{password}")
    public TourGuide tourguidelogin(@PathVariable String username, @PathVariable String password) {
        return serv.tourguidelogin(username, password);
    }
    @GetMapping("/adminlogin/{username}/{password}")
    public Admin adminlogin(@PathVariable String username, @PathVariable String password) {
        return serv.adminlogin(username, password);
    }
}
