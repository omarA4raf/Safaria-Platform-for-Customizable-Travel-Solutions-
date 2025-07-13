package com.safaria.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.safaria.backend.DTO.UserInfoDTO;
import com.safaria.backend.service.ProfileService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("user/all/{id}/{role}")
    public ResponseEntity<?> getAllUserInfo(@PathVariable Integer id, @PathVariable String role) {
        UserInfoDTO userInfo = profileService.getUserByIdAndRole(id, role);

        if (userInfo != null) {
            return ResponseEntity.ok(userInfo);
        } else {
            return ResponseEntity.notFound().build();
        }

    }

}
