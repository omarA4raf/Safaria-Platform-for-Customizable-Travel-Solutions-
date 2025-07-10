package com.safaria.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Reward")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Reward {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RewardId")
    private Integer rewardId;

    @Column(name = "TouristUsername")
    private String touristUsername;

    @Column(name = "Points")
    private Integer points;

    @Enumerated(EnumType.STRING)
    @Column(name = "ActivityType")
    private ActivityType activityType;

    @Column(name = "Timestamp")
    private LocalDateTime timestamp;

    public enum ActivityType {
        Review, Booking, Referral
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public void setActivityType(ActivityType activityType) {
        this.activityType = activityType;
    }

    public Reward(String touristUsername, ActivityType activityType, Integer points) {
        this.touristUsername = touristUsername;
        this.activityType = activityType;
        this.points = points;
        this.timestamp = LocalDateTime.now();
    }
}
