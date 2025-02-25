package com.safaria.backend.repository;

import com.safaria.backend.entity.TourGuide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourGuideRepository extends JpaRepository<TourGuide, Integer> {

    // Add custom query methods if needed, for example:
    // TourGuide findByEmail(String email);
    // List<TourGuide> findByCountry(String country);
}