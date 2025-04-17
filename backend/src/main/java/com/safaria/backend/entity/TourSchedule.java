package com.safaria.backend.entity;
import jakarta.persistence.*;
import java.time.LocalDate;

import lombok.*;

@Entity
@Getter
@Setter
@Table(name = "TourSchedule")
public class TourSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TourScheduleID")
    private Integer TourScheduleID;

    @ManyToOne // manytone when using foriegn key which one of it maps to many of this entity
    // but onetomany when annotate a repeated field
    @JoinColumn(name = "TourID") // Assuming TourProviderID is the foreign key column
    private Tour tour;


//    @Column(name = "Duration")
//    private Integer duration; // Duration in days

    @Column(name = "Price")
    private Double price;

    @Column(name = "StartDate",nullable = false)
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    @Column(name = "AvailableSeats") // Add this column
    private Integer availableSeats; // Assuming available seats is an integer

}
