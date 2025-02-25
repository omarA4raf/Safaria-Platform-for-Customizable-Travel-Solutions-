package com.safaria.backend.repository;

import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourGuide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Add custom query methods if needed, for example:
    // Admin findByEmail(String email);
    Optional<Admin> findByUsername(String username);

    @Override
    void deleteById(Integer aLong);
}