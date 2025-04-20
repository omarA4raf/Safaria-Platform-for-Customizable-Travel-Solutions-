package com.safaria.backend.service;

import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.entity.Tourist;

import org.springframework.http.ResponseEntity;

import com.safaria.backend.DTO.TouristSignUpDTO;
import com.safaria.backend.DTO.UserInfoDTO;
import com.safaria.backend.DTO.TourProviderSignUpDTO;

import java.util.List;
import java.util.Optional;


public interface Iservices {

    // public ResponseEntity<UserInfoDTO> touristlogin(String username, String password);
    // public ResponseEntity<UserInfoDTO> tourProviderlogin(String username, String password);
    // public ResponseEntity<UserInfoDTO> adminlogin(String username, String password);
    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist);
    public ResponseEntity<String> saveTourProvider(TourProviderSignUpDTO tourProvider,Boolean type);
    public Optional<List<TourProvider>> getPendingProviders();
    public ResponseEntity<String> deleteTourProvider(Integer id);
    public ResponseEntity<String> approveTourProvider(Integer id);

}
