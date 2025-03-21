package com.safaria.backend.controller;

import com.safaria.backend.DTO.TourRequestDTO;
import com.safaria.backend.DTO.TourScheduleDTO;
import com.safaria.backend.entity.Tour;
import com.safaria.backend.service.TourService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @PostMapping(value = "/create", consumes = "multipart/form-data")
    public ResponseEntity<String> createTour( @ModelAttribute TourRequestDTO dto) {
        return ResponseEntity.ok(tourService.createTourWithSchedules(dto));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Tour>> getAllTours() {
        return ResponseEntity.ok(tourService.getAllTours());
    }

    @GetMapping("/{tourId}")
    public ResponseEntity<Tour> getTourById(@PathVariable Integer tourId) {
        return ResponseEntity.ok(tourService.getTourById(tourId));
    }

    @PutMapping("/{tourId}")
    public ResponseEntity<Tour> updateTour(@PathVariable Integer tourId, @RequestBody TourRequestDTO dto) {
        return ResponseEntity.ok(tourService.updateTour(tourId, dto));
    }

    @DeleteMapping("/{tourId}")
    public ResponseEntity<Void> deleteTour(@PathVariable Integer tourId) {
        tourService.deleteTour(tourId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{tourId}/schedules")
    public ResponseEntity<String> addSchedulesToTour(@PathVariable Integer tourId, @RequestBody List<TourScheduleDTO> scheduleDTOs) {
        return ResponseEntity.ok(tourService.addSchedulesToTour(tourId, scheduleDTOs));
    }

    @DeleteMapping("/schedule/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Integer scheduleId) {
        tourService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }
}
