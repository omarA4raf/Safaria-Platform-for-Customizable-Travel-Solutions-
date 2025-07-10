package com.safaria.backend.entity;

import com.safaria.backend.DTO.UserEditDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.safaria.backend.DTO.TourProviderSignUpDTO;
import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TourProvider")
@Data
public class TourProvider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer userId;

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
    @CollectionTable(name = "tourProvider_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;

    @Column(name = "ApprovmentDocument")
    private String approvalDocumentPath; // Assuming URL is stored as a String

    @Column(name = "Type")
    private Boolean type;
    @Column(name = "Enabled")
    private boolean enabled = false;

    @Column(name = "Date")
    private Date date;

    @Column(name = "IsApproved")
    private Boolean isApproved;
    @Column(name = "StripeAccountId")
    private String stripeAccountId;

    public TourProvider(TourProviderSignUpDTO dto, String relativeFilePath, Boolean type) {

        this.username = dto.getUsername();
        this.email = dto.getEmail();
        this.password = dto.getPassword();
        this.country = dto.getCountry();
        this.approvalDocumentPath = relativeFilePath;
        this.type = type;
        this.phone = dto.getPhone();

        this.isApproved = dto.getIsApproved();
        this.date = new Date();
        this.tourismTypes = dto.getTourismTypes();
    }

    public TourProvider(Tourist tourist, Boolean type) {
        this.username = tourist.getUsername();
        this.email = tourist.getEmail();
        this.password = tourist.getPassword();
        this.country = tourist.getCountry();
        this.type = type;
        this.phone = tourist.getPhone();
        this.isApproved = false;
        this.tourismTypes = new ArrayList<>(tourist.getTourismTypes());
        this.profilePhoto = tourist.getProfilePhoto();
        this.date = new Date();
    }

    public TourProvider(Admin admin, Boolean type) {
        this.username = admin.getUsername();
        this.email = admin.getEmail();
        this.password = admin.getPassword();
        this.phone = admin.getPhone();
        this.isApproved = false;
        this.profilePhoto = admin.getProfilePhoto();
        this.type = type;
        this.date = new Date();

    }

    public TourProvider(UserEditDto user) {
        this.username = user.getName();
        this.password = user.getName() + "Password@123";
        this.isApproved = false;
        this.date = new Date();

    }

}
