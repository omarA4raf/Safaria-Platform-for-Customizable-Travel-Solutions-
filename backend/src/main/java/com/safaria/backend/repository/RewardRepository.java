package com.safaria.backend.repository;

import com.safaria.backend.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Integer> {
    // You can add custom query methods here if needed
    Reward findByTouristId(Integer touristId);
}