package com.safaria.backend.repository;

import com.safaria.backend.entity.TourSchedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TourScheduleRepository extends JpaRepository<TourSchedule, Integer> {
}
