package com.safaria.backend.repository;

import com.safaria.backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Add custom query methods if needed, for example:
    // Admin findByEmail(String email);
}