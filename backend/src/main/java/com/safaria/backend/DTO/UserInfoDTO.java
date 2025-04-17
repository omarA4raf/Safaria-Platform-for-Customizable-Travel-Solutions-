package com.safaria.backend.DTO;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.entity.Tourist;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserInfoDTO {
    private String name;
    private String email;
    private String password;
    private String phoneNumber;
    private String country;
    private List<String> tourismTypes;
    private String aboutMe;
    private List<String> myTrips;
    private List<String> myClients;
    private List<String> myReviews;
    private float rating;
    private String type;
    


public UserInfoDTO(Tourist tourist) {
    this.name = tourist.getUsername();
    this.email = tourist.getEmail();
    this.password = tourist.getPassword();
    this.phoneNumber = tourist.getPhone();
    this.country = tourist.getCountry();
    this.tourismTypes = tourist.getTourismTypes();
    
    // Optional fields (since Tourist class doesn't have these)
    this.aboutMe = "I am A Tourist";
    this.myTrips = new ArrayList<>();
    this.myClients = new ArrayList<>();
    this.myReviews = new ArrayList<>();
    this.rating=5;
}
public UserInfoDTO(TourProvider tourProvider) {
    this.name = tourProvider.getUsername();
    this.email = tourProvider.getEmail();
    this.password = tourProvider.getPassword();
    this.phoneNumber = tourProvider.getPhone();
    this.country = tourProvider.getCountry();
    this.tourismTypes = tourProvider.getTourismTypes();

    // Optional fields (TourProvider doesn't have them, initializing with default values)
    this.aboutMe = "I am A TourProvider";
    this.myTrips = new ArrayList<>();
    this.myClients = new ArrayList<>();
    this.myReviews = new ArrayList<>();
    this.rating=5;
}}

   