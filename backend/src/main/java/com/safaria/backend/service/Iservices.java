package com.safaria.backend.service;

import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourGuide;
import com.safaria.backend.entity.Tourist;

public interface Iservices {

    public Tourist touristlogin(String username, String password);
    public TourGuide tourguidelogin(String username, String password);
    public Admin adminlogin(String username, String password);
    public Tourist savetourist(Tourist tourist);
}
