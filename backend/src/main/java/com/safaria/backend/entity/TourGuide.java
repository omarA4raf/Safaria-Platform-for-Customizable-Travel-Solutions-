package com.safaria.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.safaria.backend.DTO.TourGuideSignUpDTO;
import com.safaria.backend.service.FileSystemService;

import jakarta.persistence.*;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


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
    private String approvalDocumentPath; // Assuming URL is stored as a String

    public String getPassword() {
        return password;
    }
    public TourGuide(TourGuideSignUpDTO dto)  {
            this.username = dto.getUsername();
            this.email = dto.getEmail();
            this.password = dto.getPassword();
            this.country = dto.getCountry();
            this.approvalDocumentPath=  dto.getApprovalDocument()[0];
            this.phone = dto.getPhone();

    }
}