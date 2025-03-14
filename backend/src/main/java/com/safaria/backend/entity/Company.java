package com.safaria.backend.entity;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.safaria.backend.DTO.CompanySignUpDTO;
import com.safaria.backend.service.FileSystemService;

import jakarta.persistence.*;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Company") // Explicitly set the table name
public class Company {
    @Autowired
    @Transient
    private  FileSystemService fileSystemService;

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
    @CollectionTable(name = "company_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;

    @Column(name = "BusinessLicenseNumber",unique = true)
    private String businessLicenseNumber; 
    @Column(name = "BusinessLicenseDocument")
    private String businessLicenseDocumentPath;

    public String getPassword() {
        return password;
    }
    public Company(CompanySignUpDTO dto,String fileRelativePath) {
        this.username = dto.getUsername();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.phone = dto.getPhone();
        this.businessLicenseNumber=dto.getBusinessLicenseNumber();
        this.businessLicenseDocumentPath=  fileRelativePath;

    }
}