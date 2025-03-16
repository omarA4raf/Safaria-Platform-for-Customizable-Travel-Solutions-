package com.safaria.backend.repository;
import com.safaria.backend.entity.TourProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TourProviderRepository extends JpaRepository<TourProvider, Integer> {

    // Add custom query methods if needed, for example:
    // TourGuide findByEmail(String email);
    // List<TourGuide> findByCountry(String country);

    Optional<TourProvider> findByUsername(String username);
    Optional<TourProvider> findByEmail(String email);

    Boolean existsByEmail(String email );
    Optional<List<TourProvider>> findByType(Boolean type);

    @Override
    void deleteById(Integer aLong);
}