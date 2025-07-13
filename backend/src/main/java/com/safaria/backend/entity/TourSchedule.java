package com.safaria.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Data;

@Entity
@Data
@Table(name = "TourSchedule")
public class TourSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TourScheduleID")
    private Integer TourScheduleID;

    @ManyToOne
    @JoinColumn(name = "TourID")
    private Tour tour;

    @Column(name = "Price")
    private Double price;

    @Column(name = "StartDate", nullable = false)
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    @Column(name = "AvailableSeats")
    private Integer availableSeats;

}
