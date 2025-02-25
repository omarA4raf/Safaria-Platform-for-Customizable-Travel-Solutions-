package com.safaria.backend.service;


import com.safaria.backend.entity.*;
import com.safaria.backend.repository.AdminRepository;
import com.safaria.backend.repository.TourGuideRepository;
import com.safaria.backend.repository.TouristRepository;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class services {

    @Autowired
    private TouristRepository touristRepository;
    @Autowired
    private TourGuideRepository tourGuideRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public Tourist touristlogin(String username, String password) {
        Optional<Tourist> tourist = touristRepository.findByUsername(username);
        if (tourist.isPresent()) {
                if (passwordEncoder.matches(password, tourist.get().getPassword())) {
                    return tourist.get();
                } else {
                    return null;
                }

        }
        return null;
    }

    public TourGuide tourguidelogin(String username, String password) {
        Optional<TourGuide> tourguide = tourGuideRepository.findByUsername(username);
        if (tourguide.isPresent()) {
            if (passwordEncoder.matches(password, tourguide.get().getPassword())) {
                return tourguide.get();
            } else {
                return null;
            }

        }
        return null;
    }

    public Admin adminlogin(String username, String password) {
        Optional<Admin> admin = adminRepository.findByUsername(username);
        if (admin.isPresent()) {
            if (passwordEncoder.matches(password, admin.get().getPassword())) {
                return admin.get();
            } else {
                return null;
            }

        }
        return null;
    }
}
