package com.safaria.backend.repository;


import com.safaria.backend.entity.Tourist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
@Repository
public interface TouristRepository extends JpaRepository<Tourist, Integer> {

    // You can add custom query methods here if needed.
    // For example, to find a tourist by email:
    // Tourist findByEmail(String email);

    // Or to find tourists by country:
    // List<Tourist> findByCountry(String country);

    // Spring Data JPA will automatically generate the basic CRUD methods.
    Optional <Tourist> findByUsername(String username);
    Optional<Tourist> findByEmail(String email);
    Boolean existsByEmail(String email );

    @Override
    void deleteById(Integer aLong);
}