package com.safaria.backend.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

import lombok.*;

@Entity
@Data
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

    @Column(name = "DestinationCountry", nullable = false)
    private String destinationCountry;

    @Column(name = "Currency", nullable = false)
    private String currency; // Currency code (e.g., USD, EUR)

    @Enumerated(EnumType.STRING) // Store enum as string in DB
//    @Column(name = "Category")
//    private Category category;

    @ElementCollection // To store multiple tourism types
    @CollectionTable(name = "Tour_TourismTypes", joinColumns = @JoinColumn(name = "TourID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes = new ArrayList<>();

    @ManyToOne // manytone when using foriegn key which one of it maps to many of this entity
    // but onetomany when annotate a repeated field
    @JoinColumn(name = "TourProviderID") // Assuming TourProviderID is the foreign key column
    private TourProvider tourProvider;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Image> images = new ArrayList<>();
//    public enum Category {
//        PRE_PACKAGED, CUSTOMIZED
//    }
}