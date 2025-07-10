package com.safaria.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;

@Entity
@Table(name = "TourBooking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BookingID")
    private Integer bookingId;
    @ManyToOne // this annotation means that one tour can have many tourbookings
    @JoinColumn(name = "Tour")
    private Tour tour; // Foreign key to Tours table
    @ManyToOne
    @JoinColumn(name = "Tourist")
    private Tourist tourist; // Foreign key to tourist table

    @Column(name = "BookingDate")
    private Timestamp bookingDate;

    @Column(name = "TotalCost")
    private double totalCost;

}
