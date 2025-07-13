package com.safaria.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Data
public class Booking {

    public enum BookingStatus {
        PENDING,
        CONFIRMED,
        CANCELLED
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer numberOfSeats;

    private LocalDateTime bookingTime = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "TourScheduleID")
    private TourSchedule schedule;

    @ManyToOne
    @JoinColumn(name = "UserId")
    private Tourist user;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;

    private Double TotalPrice;

}
