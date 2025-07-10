package com.safaria.backend.entity;

import com.safaria.backend.DTO.UserEditDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Admin")
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

    public Admin(Tourist tourist) {
        this.username = tourist.getUsername();
        this.email = tourist.getEmail();
        this.password = tourist.getPassword();
        this.phone = tourist.getPhone();
        this.profilePhoto = tourist.getProfilePhoto();
    }

    public Admin(TourProvider provider) {
        this.username = provider.getUsername();
        this.email = provider.getEmail();
        this.password = provider.getPassword();
        this.phone = provider.getPhone();
        this.profilePhoto = provider.getProfilePhoto();
    }

    public Admin(UserEditDto user) {
        this.username = user.getName();
        this.password = user.getName() + "Password@123";
    }
}
