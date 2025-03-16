package com.safaria.backend.service;

import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.entity.Tourist;

import org.springframework.http.ResponseEntity;

import com.safaria.backend.DTO.TouristSignUpDTO;
import com.safaria.backend.DTO.TourProviderSignUpDTO;

import java.util.List;
import java.util.Optional;


public interface Iservices {

    public Tourist touristlogin(String username, String password);
    public TourProvider tourProviderlogin(String username, String password);
    public Admin adminlogin(String username, String password);
    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist);
    public ResponseEntity<String> saveTourProvider(TourProviderSignUpDTO tourProvider,Boolean type);
    public Optional<List<TourProvider>> getPendingProviders();
    public ResponseEntity<String> deleteTourProvider(Integer id);
    public ResponseEntity<String> approveTourProvider(Integer id);

}
