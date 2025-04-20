package com.safaria.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .headers(headers -> headers
                        .frameOptions(frame -> frame.disable())  // Disable X-Frame-Options header
                        .contentSecurityPolicy(csp ->
                                csp.policyDirectives("frame-ancestors 'self' http://localhost:4200") // Allow iframe from localhost:4200 (your Angular app)
                        ) // ✅ allow iframes from same origin
                )
                .csrf(csrf -> csrf.disable()) // optional if you're not doing POST/PUTs yet
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/files/**").permitAll()
                        .anyRequest().permitAll() // ✅ Only call once
                );
        return http.build();
    }
}

