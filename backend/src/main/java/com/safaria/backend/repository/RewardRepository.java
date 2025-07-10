package com.safaria.backend.repository;

import com.safaria.backend.entity.Reward;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Integer> {

    Reward findByTouristUsername(String touristUsername);
}
