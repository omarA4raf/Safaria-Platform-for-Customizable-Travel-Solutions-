package com.safaria.backend.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

//import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "tourist")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tourist {

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
    private String profilePhoto;

    @ElementCollection
    @CollectionTable(name = "tourist_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;
}