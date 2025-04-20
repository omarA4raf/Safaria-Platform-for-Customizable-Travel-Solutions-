package com.safaria.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.safaria.backend.entity.Tourist;
import com.safaria.backend.repository.TouristRepository;
import org.springframework.security.core.userdetails.User;


@Service("touristUserDetailsService")
public class TouristUserDetailsService implements UserDetailsService {

    @Autowired
    private TouristRepository touristRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Tourist tourist = touristRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Tourist not found"));

        return User.builder()
                .username(tourist.getEmail())
                .password(tourist.getPassword()) // already encoded
                .roles("TOURIST")
                .build();
    }
}

