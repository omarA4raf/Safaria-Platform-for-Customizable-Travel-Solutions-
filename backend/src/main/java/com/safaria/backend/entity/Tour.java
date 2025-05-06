package com.safaria.backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

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
    @Column(name = "rating", nullable = false , columnDefinition = "FLOAT DEFAULT -1")
    private Float rating;
  

    @Column(name = "Currency", nullable = false)
    private String currency; // Currency code (e.g., USD, EUR)
    

//     @Enumerated(EnumType.STRING) // Store enum as string in DB
// //    @Column(name = "Category")
// //    private Category category;



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