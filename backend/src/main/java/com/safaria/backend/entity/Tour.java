package com.safaria.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.*;

@Entity
@Table(name = "Tour")
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TourID")
    private Integer tourId;

    @Column(name = "Title")
    private String title;

    @Column(name = "Description", columnDefinition = "TEXT") // Assuming description can be long
    private String description;

    @Column(name = "Duration")
    private Integer duration; // Duration in days

    @Column(name = "Price")
    private Double price;

    @Enumerated(EnumType.STRING) // Store enum as string in DB
    @Column(name = "Category")
    private Category category;

    @ManyToOne // manytone when using foriegn key which one of it maps to many of this entity
    // but onetomany when annotate a repeated field
    @JoinColumn(name = "TourProviderID") // Assuming TourProviderID is the foreign key column
    private TourProvider tourProvider;


    @Column(name = "StartDate")
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    @Column(name = "AvailableSeats") // Add this column
    private Integer availableSeats; // Assuming available seats is an integer

    public enum Category {
        PRE_PACKAGED, CUSTOMIZED
    }
}