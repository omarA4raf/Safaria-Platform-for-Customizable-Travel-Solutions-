package com.safaria.backend.repository;

import com.safaria.backend.entity.Company;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Integer> {

    // Add custom query methods if needed, for example:
    // TourGuide findByEmail(String email);
    // List<TourGuide> findByCountry(String country);

    Optional<Company> findByUsername(String username);
    Optional<Company> findByEmail(String email);
    Boolean existsByEmail(String email );
    Boolean existsByBusinessLicenseNumber(String businessLicenseNumber );

    @Override
    void deleteById(Integer aLong);
}
