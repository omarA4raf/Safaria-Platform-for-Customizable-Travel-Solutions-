package com.safaria.backend.repository;

import com.safaria.backend.entity.TourGuide;
import com.safaria.backend.entity.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TourGuideRepository extends JpaRepository<TourGuide, Integer> {

    // Add custom query methods if needed, for example:
    // TourGuide findByEmail(String email);
    // List<TourGuide> findByCountry(String country);

    Optional<TourGuide> findByUsername(String username);
    Optional<TourGuide> findByEmail(String email);
    @Override
    void deleteById(Integer aLong);
}