package com.safaria.backend.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.safaria.backend.DTO.BookingRequestDTO;
import com.safaria.backend.DTO.BookingResponseDTO;
import com.safaria.backend.DTO.TourRequestDTO;
import com.safaria.backend.DTO.TourScheduleDTO;
import com.safaria.backend.DTO.TourSearchDTO;
import com.safaria.backend.entity.Booking;
import com.safaria.backend.entity.Image;
import com.safaria.backend.entity.Tour;
import com.safaria.backend.service.FileSystemService;
import com.safaria.backend.service.ImageService;
import com.safaria.backend.service.TourService;

@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
@RestController
@RequestMapping("/api/tours")
public class TourController {

    @Autowired
    private TourService tourService;
    @Autowired
    private FileSystemService fileService;
    @Autowired
    private ImageService imageService;

    @PreAuthorize("hasRole('PROVIDER')")
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> createTour(@RequestPart("tourData") TourRequestDTO tourdto, @RequestPart("images") List<MultipartFile> images) {
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
    public ResponseEntity<TourRequestDTO> getTourById(@PathVariable Integer tourId) {
        return ResponseEntity.ok(tourService.getTourDTOById(tourId));
    }

    @PreAuthorize("hasRole('PROVIDER')")
    @PutMapping("/{tourId}")
    public ResponseEntity<Tour> updateTour(@PathVariable Integer tourId, @RequestBody TourRequestDTO dto) {
        return ResponseEntity.ok(tourService.updateTour(tourId, dto));
    }

    @PreAuthorize("hasRole('PROVIDER')")
    @DeleteMapping("/{tourId}")
    public ResponseEntity<Void> deleteTour(@PathVariable Integer tourId) {
        tourService.deleteTour(tourId);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('PROVIDER')")
    @PostMapping("/{tourId}/schedules")
    public ResponseEntity<String> addSchedulesToTour(@PathVariable Integer tourId, @RequestBody List<TourScheduleDTO> scheduleDTOs) {
        return ResponseEntity.ok(tourService.addSchedulesToTour(tourId, scheduleDTOs));
    }

    @PreAuthorize("hasRole('PROVIDER')")
    @DeleteMapping("/schedule/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Integer scheduleId) {
        tourService.deleteSchedule(scheduleId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/image/{id}")
    public ResponseEntity<byte[]> getImage(@PathVariable Integer id) {
        List<Image> images = imageService.getImagesByTour(id);

        if (images == null || images.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 if no image found
        }

        String imagePath = images.get(0).getImageUrl(); // Get the first image
        try {
            byte[] imageData = fileService.getFileBytesFromPath(imagePath);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(imageData);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // Return 500
        }
    }

    @GetMapping("/country/{country}")
    public ResponseEntity<List<TourSearchDTO>> getToursByCountry(
            @PathVariable String country,
            @RequestParam int offset,
            @RequestParam int size) {
        String sanitizedCountry = country.trim();
        List<TourSearchDTO> tours = tourService.getToursByCountry(sanitizedCountry, offset, size);

        return ResponseEntity.ok(tours);
    }

    @PostMapping("/bookings")
    public ResponseEntity<BookingResponseDTO> bookTour(@RequestBody BookingRequestDTO bookingRequest) {
        Booking booking = tourService.createBooking(
                bookingRequest.getScheduleId(),
                bookingRequest.getNumberOfSeats(),
                bookingRequest.getUserId()
        );
        BookingResponseDTO dto = new BookingResponseDTO();
        dto.setId(booking.getId());
        dto.setNumberOfSeats(booking.getNumberOfSeats());
        dto.setBookingTime(booking.getBookingTime());
        dto.setScheduleId(booking.getSchedule().getTourScheduleID());
        dto.setUserId(booking.getUser().getId());
        dto.setStatus(booking.getStatus().name());
        dto.setTotalPrice(booking.getTotalPrice());

        return ResponseEntity.ok(dto);
    }

    @PutMapping("/bookings/{bookingId}/confirm-payment")
    public ResponseEntity<?> confirmBookingPayment(@PathVariable Long bookingId) {
        Booking booking = tourService.getBookingById(bookingId);
        if (booking == null) {
            return ResponseEntity.notFound().build();
        }
        booking.setStatus(Booking.BookingStatus.CONFIRMED);
        tourService.saveBooking(booking);
        return ResponseEntity.ok().build();
    }
}
