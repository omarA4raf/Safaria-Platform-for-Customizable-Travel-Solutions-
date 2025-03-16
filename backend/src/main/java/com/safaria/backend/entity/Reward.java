package com.safaria.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import java.sql.Timestamp;

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

    @ManyToOne
    @JoinColumn(name = "TouristId")
    private Tourist tourist; // Changed from User to Tourist

    @Column(name = "Points")
    private Integer points;

    @Enumerated(EnumType.STRING)
    @Column(name = "ActivityType")
    private ActivityType activityType;

    @Column(name = "Timestamp")
    private Timestamp timestamp;

    public enum ActivityType {
        Review, Booking, Referral
    }
}