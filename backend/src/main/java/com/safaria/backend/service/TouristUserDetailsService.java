package com.safaria.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.safaria.backend.DTO.CustomUserDetails;
import com.safaria.backend.entity.Tourist;
import com.safaria.backend.repository.TouristRepository;

@Service("touristUserDetailsService")
public class TouristUserDetailsService implements UserDetailsService {

    @Autowired
    private TouristRepository touristRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Tourist tourist = touristRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Tourist not found"));

        return new CustomUserDetails(tourist.getId(), tourist.getEmail(), tourist.getPassword(), "TOURIST", tourist.getUsername());

    }
}
