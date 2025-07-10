package com.safaria.backend.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.safaria.backend.entity.Tourist;

@Repository
public interface TouristRepository extends JpaRepository<Tourist, Integer> {

    Optional<Tourist> findByUsername(String username);

    Optional<Tourist> findByEmail(String email);

    Optional<Tourist> findById(Integer id);

    Boolean existsByEmail(String email);

    @Override
    void deleteById(Integer aLong);
}
