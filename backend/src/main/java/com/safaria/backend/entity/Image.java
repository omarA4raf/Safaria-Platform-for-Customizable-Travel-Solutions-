package com.safaria.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Image")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ImageID")
    private Integer imageId;

    @Column(name = "ImageUrl", nullable = false)
    private String imageUrl;

    @Column(name = "Description", columnDefinition = "TEXT") // Optional field for description
    private String description;

    @ManyToOne
    @JoinColumn(name = "TourID", nullable = false) // Foreign key linking to Tour
    private Tour tour;
}
