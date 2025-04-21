package com.safaria.backend.DTO;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
@Data
public class CustomUserDetails implements UserDetails {
    private Integer id;
    private String username;
    private String password;
    private String role;

    public CustomUserDetails(Integer id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public Integer getId() {
        return id;
    }
   @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));
    }

    // Implement UserDetails methods (getAuthorities, getPassword, getUsername, etc.)
}
