package com.safaria.backend.repository;

import com.safaria.backend.entity.TourBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TourBookingRepository extends JpaRepository<TourBooking, Integer> {
}
