package com.safaria.backend.controller;
import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.safaria.backend.DTO.UserDTO;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/signup/{type}")
public class SignUpController {

    @Autowired
    private Iservices serv;
    public ResponseEntity<String> signUp(@PathVariable int type,@RequestBody UserDTO user) {
        if(type==1)
        {
            return serv.savetourist(user);
        }
        else if (type==2)
        {
            return serv.saveTourGuide(user);
        }

    }
}
