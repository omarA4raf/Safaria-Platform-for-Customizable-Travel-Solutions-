package com.safaria.backend.service;

import com.safaria.backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.safaria.backend.DTO.CustomUserDetails;
import com.safaria.backend.entity.Admin;

@Service("adminUserDetailsService")
public class AdminUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Admin not found"));

        return new CustomUserDetails(admin.getUserId(), admin.getEmail(), admin.getPassword(), "ADMIN", admin.getUsername());

    }
}
