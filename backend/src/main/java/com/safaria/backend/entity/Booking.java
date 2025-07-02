package com.safaria.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
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
    private Tourist user; // Rename from tourist to user

    @Enumerated(EnumType.STRING)
    private BookingStatus status; // Add this line for booking status

    private double TotalPrice;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Integer getNumberOfSeats() { return numberOfSeats; }
    public void setNumberOfSeats(Integer numberOfSeats) { this.numberOfSeats = numberOfSeats; }

    public LocalDateTime getBookingTime() { return bookingTime; }
    public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }

    public TourSchedule getSchedule() { return schedule; }
    public void setSchedule(TourSchedule schedule) { this.schedule = schedule; }

    public Tourist getUser() { return user; }
    public void setUser(Tourist user) { this.user = user; }

    public BookingStatus getStatus() { return status; } // Add this getter
    public void setStatus(BookingStatus status) { this.status = status; } // Add this setter
    public void setTotalPrice(int numberOfSeats, double pricePerSeat) {
        // TODO Auto-generated method stub
        this.TotalPrice = numberOfSeats * pricePerSeat;
    }
    public double getTotalPrice() {
        // TODO Auto-generated method stub
        return this.TotalPrice;
    }
}
