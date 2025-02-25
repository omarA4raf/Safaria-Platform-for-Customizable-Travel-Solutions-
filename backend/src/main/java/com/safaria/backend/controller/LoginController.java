package com.safaria.backend.controller;

import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
