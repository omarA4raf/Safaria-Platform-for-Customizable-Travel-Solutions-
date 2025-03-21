package com.safaria.backend.controller;

import com.safaria.backend.DTO.UserInfoDTO;
import com.safaria.backend.DTO.UserLoginDTO;
import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    Iservices serv;
    @GetMapping("/")
    String sayHello(){
        return "Hello ,World! :) ";
    }

    @GetMapping("/touristlogin")
    public ResponseEntity<UserInfoDTO> touristlogin(@RequestBody UserLoginDTO dto) {
        System.out.println("Ahmed");
        return serv.touristlogin(dto.getEmail(),dto.getPassword());
    }
  
    @GetMapping("/tourproviderlogin")
    public ResponseEntity<UserInfoDTO> tourProviderlogin(@RequestBody UserLoginDTO dto) {
        System.out.println("Ahmed");
        return serv.tourProviderlogin(dto.getEmail(),dto.getPassword());
    }
    // @GetMapping("/adminlogin/")
    // public ResponseEntity<UserInfoDTO> adminlogin(@RequestBody UserLoginDTO dto) {
    //     return serv.adminlogin(dto.getEmail(),dto.getPassword());
    // }
   
}
