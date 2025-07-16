package com.safaria.backend.service;

import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtUtil;

    @Autowired
    @Qualifier("touristUserDetailsService")
    private UserDetailsService touristUserDetailsService;

    @Autowired
    @Qualifier("tourProviderUserDetailsService")
    private UserDetailsService tourProviderUserDetailsService;

    @Autowired
    @Qualifier("adminUserDetailsService")
    private UserDetailsService adminUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {
        String path = request.getRequestURI();

        // Skip JWT authentication for paths starting with "/auth"
        if (path.startsWith("/auth")) {
            chain.doFilter(request, response);
            return;
        }

        final String authHeader = request.getHeader("Authorization");

        // Check if the Authorization header is present
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization token is missing or invalid.");
            return;
        }

        String jwt = authHeader.substring(7);
        String username;
        String role;
        try {
            username = jwtUtil.extractUsername(jwt);
            role = jwtUtil.extractRole(jwt);
        } catch (io.jsonwebtoken.MalformedJwtException e) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization token is missing or invalid.");
            return;
        }
        UserDetails userDetails = null;

        // Load UserDetails based on the role
        if ("TOURIST".equals(role)) {
            userDetails = touristUserDetailsService.loadUserByUsername(username); // Load tourist user details
        } else if ("PROVIDER".equals(role)) {
            userDetails = tourProviderUserDetailsService.loadUserByUsername(username); // Load provider user details
        } else if ("ADMIN".equals(role)) {
            userDetails = adminUserDetailsService.loadUserByUsername(username); // Load admin user details
        } else {
            // Handle unsupported role if needed
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Role.");
            return;
        }

        // If no username or invalid token, return unauthorized response
        if (userDetails != null && jwtUtil.validateToken(jwt, userDetails)) {
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            // Set the authentication in the SecurityContextHolder
            SecurityContextHolder.getContext().setAuthentication(authToken);
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid or expired JWT token.");
            return;
        }

        // Continue the filter chain
        chain.doFilter(request, response);
    }

}
