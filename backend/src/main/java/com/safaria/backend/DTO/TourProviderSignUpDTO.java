package com.safaria.backend.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import java.util.Date;

@Data
public class TourProviderSignUpDTO extends UserSignUpDTO {

    private String country;
    private MultipartFile approvalDocument;
    private Boolean isApproved = false;

    public String getCountry() {
        return this.country;
    }

    public MultipartFile getApprovalDocument() {
        return this.approvalDocument;
    }

    public Boolean getIsApproved() {
        return this.isApproved;
    }

    public void setIsApproved() {
        this.isApproved = true;
    }
    private Date date = new Date();

}
