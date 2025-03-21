package com.safaria.backend.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.safaria.backend.DTO.TourProviderSignUpDTO;

import jakarta.persistence.*;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "TourProvider") // Explicitly set the table name
public class TourProvider {
   

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
    @CollectionTable(name = "tourProvider_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;

    @Column(name = "ApprovmentDocument")
    private String approvalDocumentPath; // Assuming URL is stored as a String

    @Column(name = "Type")
    private Boolean type;
    @Column(name = "Enabled")
    private boolean enabled = false;

    public String getPassword() {
        return password;
    }

    public Boolean getApproved() {
        return isApproved;
    }
    public void setIsApproved(Boolean Approvement){this.isApproved=Approvement;}

    @Column(name = "IsApproved")
    private Boolean isApproved;
    public TourProvider(TourProviderSignUpDTO dto, String relativeFilePath,Boolean type)  {

            this.username = dto.getUsername();
            this.email = dto.getEmail();
            this.password = dto.getPassword();
            this.country = dto.getCountry();
            this.approvalDocumentPath=  relativeFilePath ; 
            this.type=type;
            this.phone = dto.getPhone();

            this.isApproved=dto.getIsApproved();

            this.tourismTypes=dto.getTourismTypes();


    }
}