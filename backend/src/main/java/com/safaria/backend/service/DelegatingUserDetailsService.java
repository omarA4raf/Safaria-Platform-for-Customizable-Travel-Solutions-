package com.safaria.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.safaria.backend.service.TourProviderUserDetailsService;
import com.safaria.backend.service.TouristUserDetailsService;

@Service
public class DelegatingUserDetailsService implements UserDetailsService {

    @Autowired
    private TouristUserDetailsService touristUserDetailsService;

    @Autowired
    private TourProviderUserDetailsService providerUserDetailsService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (username.startsWith("tourist:")) {
            String actualUsername = username.substring("tourist:".length());
            return touristUserDetailsService.loadUserByUsername(actualUsername);
        } else if (username.startsWith("provider:")) {
            String actualUsername = username.substring("provider:".length());
            return providerUserDetailsService.loadUserByUsername(actualUsername);
        }
        throw new UsernameNotFoundException("User must start with 'tourist:' or 'provider:'");
    }
    }
