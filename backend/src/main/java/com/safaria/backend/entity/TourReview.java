package com.safaria.backend.entity;

import lombok.*;
import jakarta.persistence.*;
import java.sql.Timestamp;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer reviewID;

    @ManyToOne
    @JoinColumn(name = "tourId", nullable = false)
    private Tour tour; // Foreign Key to Tours

    @ManyToOne
    @JoinColumn(name = "tourist", nullable = false)
    private Tourist tourist; // Foreign Key to Users

    @Column(nullable = false)
    private Integer rating; // can be done as enum but will be stored as string (ONE_STAR) not 1

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Column(nullable = false)
    private Timestamp date;


}