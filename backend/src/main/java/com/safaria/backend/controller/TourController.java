package com.safaria.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.safaria.backend.DTO.TourRequestDTO;
import com.safaria.backend.DTO.TourScheduleDTO;
import com.safaria.backend.entity.Tour;
import com.safaria.backend.service.TourService;

@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> createTour( @RequestPart("tourData")  TourRequestDTO tourdto, @RequestPart("images") List<MultipartFile> images) {
        System.out.println();
        System.out.println();
        System.out.println();
        System.out.println(tourdto);
        System.out.println("Received images: " + images.size());
        String result = tourService.createTourWithSchedules(tourdto, images);
        return ResponseEntity.ok(Map.of("message", result)); // Return JSON response
    }

    @GetMapping("/all")
    public ResponseEntity<List<TourRequestDTO>> getAllTours() {
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
