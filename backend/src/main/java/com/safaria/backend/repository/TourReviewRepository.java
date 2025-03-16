package com.safaria.backend.repository;

import com.safaria.backend.entity.TourReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourReviewRepository extends JpaRepository<TourReview, Integer> {
    // You can add custom query methods here if needed
}