package com.safaria.backend.entity;

import com.safaria.backend.DTO.TouristSignUpDTO;
import com.safaria.backend.DTO.UserEditDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@Table(name = "tourist")
@AllArgsConstructor
public class Tourist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer Id;

    @Column(name = "Username", unique = true)
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
    private String profilePhoto;

    @ElementCollection
    @CollectionTable(name = "tourist_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;
    @Column(name = "ُEnabled")
    private boolean enabled = false;
    @Column(name = "aboutme")
    private boolean aboutMe;

    public Tourist(TouristSignUpDTO dto) {
        this.username = dto.getUsername();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.country = dto.getCountry();
        this.tourismTypes = dto.getTourismTypes();
        this.phone = dto.getPhone();
    }

    public Tourist(TourProvider provider) {
        this.username = provider.getUsername();
        this.email = provider.getEmail();
        this.password = provider.getPassword();
        this.country = provider.getCountry();
        this.tourismTypes = new ArrayList<>(provider.getTourismTypes());
        this.phone = provider.getPhone();
        this.profilePhoto = provider.getProfilePhoto();

    }

    public Tourist(Admin admin) {
        this.username = admin.getUsername();
        this.email = admin.getEmail();
        this.password = admin.getPassword();
        this.phone = admin.getPhone();
        this.profilePhoto = admin.getProfilePhoto();
    }

    public Tourist(UserEditDto user) {
        this.username = user.getName();
        this.password = user.getName() + "Password@123";
    }

}
