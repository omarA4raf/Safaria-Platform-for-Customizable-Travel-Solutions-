package com.safaria.backend.service;


import com.safaria.backend.entity.*;
import com.safaria.backend.repository.AdminRepository;
import com.safaria.backend.repository.CompanyRepository;
import com.safaria.backend.repository.TourGuideRepository;
import com.safaria.backend.repository.TouristRepository;
import com.safaria.backend.DTO.CompanySignUpDTO;
import com.safaria.backend.DTO.TourGuideSignUpDTO;
import com.safaria.backend.DTO.TouristSignUpDTO;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class services implements Iservices {

    @Autowired
    private TouristRepository touristRepository;
    @Autowired
    private TourGuideRepository tourGuideRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private CompanyRepository companyRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CheckEmailService checkEmailService;


    @Override
    public Tourist touristlogin(String username, String password) {
        System.out.println(username+" "+password);
        Optional<Tourist> tourist = touristRepository.findByUsername(username);
        System.out.println(tourist.isPresent());

        if (tourist.isPresent()) {
                if (passwordEncoder.matches(password, tourist.get().getPassword())) {
                    return tourist.get();
                } else {
                    return null;
                }

        }
        return null;
    }
    @Override
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
    @Override
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
    @Override
    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist) {
        if (!checkEmailService.isValidEmailDomain(tourist.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(touristRepository.existsByEmail(tourist.getEmail()))
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourist Email is already registered!");
        
        tourist.setPassword(passwordEncoder.encode(tourist.getPassword()));
        touristRepository.save(new Tourist(tourist));
        return ResponseEntity.status(200).body("DONE Tourist SignedUP");
    }
    @Override
    public ResponseEntity<String> saveTourGuide(TourGuideSignUpDTO tourGuide) {
        if (!checkEmailService.isValidEmailDomain(tourGuide.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(tourGuideRepository.existsByEmail(tourGuide.getEmail()))
        return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourGuide Email is already registered!");
        
        tourGuide.setPassword(passwordEncoder.encode(tourGuide.getPassword()));
        tourGuideRepository.save(new TourGuide(tourGuide));
        return ResponseEntity.status(200).body("DONE TourGuide SignedUP");
    }
    @Override
    public ResponseEntity<String> saveCompany(CompanySignUpDTO company) {
        if (!checkEmailService.isValidEmailDomain(company.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(companyRepository.existsByEmail(company.getEmail()))
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("Company Email is already registered!");
        else if (companyRepository.existsByBusinessLicenseNumber(company.getBusinessLicenseNumber())) 
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("Company License is already registered!");
        
        
        
        company.setPassword(passwordEncoder.encode(company.getPassword()));
        companyRepository.save(new Company(company));
        return ResponseEntity.status(200).body("DONE Company SignedUP");
    }
}
