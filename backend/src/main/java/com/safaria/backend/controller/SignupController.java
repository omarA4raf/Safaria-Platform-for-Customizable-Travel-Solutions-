package com.safaria.backend.controller;
import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/signup")
public class SignupController {

    @Autowired
    private Iservices serv;

    @PostMapping("/savetourist")
    public Tourist savetourist(@RequestBody Tourist tourist) {
        return serv.savetourist(tourist);
    }
}
