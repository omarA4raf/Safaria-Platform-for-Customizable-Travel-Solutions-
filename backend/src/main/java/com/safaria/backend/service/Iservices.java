package com.safaria.backend.service;

import com.safaria.backend.DTO.*;
import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.entity.Tourist;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


public interface Iservices {

    
     public ResponseEntity<Admin> adminlogin(String username, String password);
    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist);
    public ResponseEntity<String> saveTourProvider(TourProviderSignUpDTO tourProvider,Boolean type);
    public Optional<List<TourProviderRequestDTO>> getPendingProviders();
    public ResponseEntity<String> deleteTourProvider(Integer id);
    public ResponseEntity<String> approveTourProvider(Integer id);
    public ResponseEntity<String> deleteTourist(Integer id);
    public List<UserEditDto> getUsers();
    public ResponseEntity<String> updateUser(UserEditDto user,Integer id,Integer role);
    public ResponseEntity<String> addUser(UserEditDto user);
}
