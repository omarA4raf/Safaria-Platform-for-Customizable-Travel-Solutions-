package com.safaria.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.safaria.backend.DTO.CustomUserDetails;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.repository.TourProviderRepository;

@Service("tourProviderUserDetailsService")
public class TourProviderUserDetailsService implements UserDetailsService {

    @Autowired
    private TourProviderRepository tourProviderRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        TourProvider provider = tourProviderRepository.findByEmail(email);
        if (provider == null) {
            throw new UsernameNotFoundException("Tour provider not found");
        }

        String role = "PROVIDER";

        return new CustomUserDetails(provider.getUserId(), provider.getEmail(), provider.getPassword(), role, provider.getUsername());
    }

}
