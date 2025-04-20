package com.safaria.backend.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.User;


import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.repository.TourProviderRepository;

@Service("tourProviderUserDetailsService")
public class TourProviderUserDetailsService implements UserDetailsService {

    @Autowired
    private TourProviderRepository tourProviderRepository;

    
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        TourProvider provider = tourProviderRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Tour provider not found"));
    
        String role;
        if(provider.getType())
                role = "COMPANY";
        else        
                role = "TOUR_GUIDE";
               

        
    
        return User.builder()
                .username(provider.getEmail())
                .password(provider.getPassword())
                .roles(role) // Spring will prefix this with ROLE_
                .build();
    }
    
}

