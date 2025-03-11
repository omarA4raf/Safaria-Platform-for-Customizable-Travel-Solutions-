package com.safaria.backend.service;

import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourGuide;
import com.safaria.backend.entity.Tourist;

import org.springframework.http.ResponseEntity;

import com.safaria.backend.DTO.TouristSignUpDTO;
import com.safaria.backend.DTO.CompanySignUpDTO;
import com.safaria.backend.DTO.TourGuideSignUpDTO;



public interface Iservices {

    public Tourist touristlogin(String username, String password);
    public TourGuide tourguidelogin(String username, String password);
    public Admin adminlogin(String username, String password);
    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist);
    public ResponseEntity<String> saveTourGuide(TourGuideSignUpDTO tourGuide);
    public ResponseEntity<String> saveCompany(CompanySignUpDTO tourGuide);

}
