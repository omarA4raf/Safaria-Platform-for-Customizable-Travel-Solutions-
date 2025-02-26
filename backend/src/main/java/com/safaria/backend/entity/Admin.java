package com.safaria.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Admin") // Explicitly set the table name
public class Admin {

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

    @Column(name = "Phone")
    private String phone;

    @Column(name = "ProfilePhoto")
    private String profilePhoto; // Assuming URL is stored as a String

    public String getPassword() {
        return password;
    }
}