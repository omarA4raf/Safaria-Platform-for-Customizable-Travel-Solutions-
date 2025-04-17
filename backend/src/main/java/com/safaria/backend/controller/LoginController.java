package com.safaria.backend.controller;

import com.safaria.backend.DTO.UserInfoDTO;
import com.safaria.backend.DTO.UserLoginDTO;
import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import org.springframework.http.MediaType;


@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    Iservices serv;
    @GetMapping("/")
    String sayHello(){
        return "Hello ,World! :) ";
    }

    @GetMapping("/touristlogin/")
    public ResponseEntity<UserInfoDTO> touristlogin(@RequestParam String email, @RequestParam String password) {
        System.out.println("Ahmed");
        return serv.touristlogin(email,password);
    }
  
    @GetMapping("/tourproviderlogin/")
    public ResponseEntity<UserInfoDTO> tourProviderlogin(@RequestParam String email, @RequestParam String password) {
        System.out.println("Ahmed");
        return serv.tourProviderlogin(email,password);
    }
    // @GetMapping("/getImage")
    // public ResponseEntity<byte[]> getImage() throws IOException {
    //     byte[] image = Files.readAllBytes(Paths.get());
    //     return ResponseEntity.ok()
    //             .contentType(MediaType.IMAGE_JPEG)
    //             .body(image);
    // }
     @GetMapping("/adminlogin/")
     public ResponseEntity<Admin> adminlogin(@RequestParam String email, @RequestParam String password) {
         return serv.adminlogin(email,password);
     }
   
}
