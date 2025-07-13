package com.safaria.backend.repository;

import com.safaria.backend.entity.TourProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TourProviderRepository extends JpaRepository<TourProvider, Integer> {

    Optional<TourProvider> findByUsername(String username);

    TourProvider findByEmail(String email);

    Boolean existsByEmail(String email);

    Optional<List<TourProvider>> findByIsApproved(Boolean isApproved);

    Optional<TourProvider> findById(Integer id);

    @Override
    void deleteById(Integer aLong);
}
