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

    @Column(name = "CreatedBy")
    private Integer createdBy; // Foreign key to Users table

    @Column(name = "StartDate")
    private LocalDate startDate;

    @Column(name = "EndDate")
    private LocalDate endDate;

    // Constructors (No-arg and All-args), Getters, Setters, toString, equals, hashCode
    // ... (Generate using your IDE or write them manually)

    public enum Category {
        PRE_PACKAGED, CUSTOMIZED
    }
}