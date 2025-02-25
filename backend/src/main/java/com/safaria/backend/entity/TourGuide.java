package com.safaria.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TourGuide") // Explicitly set the table name
public class TourGuide {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "Username")
    private String username;

    @Column(name = "Password")
    private String password;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Country")
    private String country;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "ProfilePhoto")
    private String profilePhoto; // Assuming URL is stored as a String

    @ElementCollection
    @CollectionTable(name = "tourguide_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;

    @Column(name = "ApprovmentDocument")
    private String approvalDocument; // Assuming URL is stored as a String
}