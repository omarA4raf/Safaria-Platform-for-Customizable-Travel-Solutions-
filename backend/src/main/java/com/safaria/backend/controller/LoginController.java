package com.safaria.backend.controller;

import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
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
    /*
    * ------------------------------------------------------
    *
    * ------------------------------------------------------
    *
    * ------------------------------------------------------
    *
    *
    *
    *
    * --------> this endpoint should be edited
    * */
    @GetMapping("/tourguidelogin/")
    public TourProvider tourProviderlogin(@RequestParam String email, @RequestParam String password) {
        return serv.tourProviderlogin(email, password);
    }
    @GetMapping("/adminlogin/")
    public Admin adminlogin(@RequestParam String email, @RequestParam String password) {
        return serv.adminlogin(email, password);
    }
}
