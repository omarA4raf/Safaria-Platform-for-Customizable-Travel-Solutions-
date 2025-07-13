package com.safaria.backend.repository;

import com.safaria.backend.entity.TourSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TourScheduleRepository extends JpaRepository<TourSchedule, Integer> {

    List<TourSchedule> findByTour_TourId(Integer tourId);

}
