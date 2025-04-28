package com.safaria.backend.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.Date;
import java.util.List;


@Data
public class TourProviderSignUpDTO extends UserSignUpDTO {

    
    private String country;
    private MultipartFile approvalDocument;
    private Boolean isApproved=false;
    public String getCountry(){return this.country;}
    public MultipartFile getApprovalDocument(){return this.approvalDocument;}
    public Boolean getIsApproved(){return this.isApproved;}
    public void setIsApproved(){this.isApproved=true;}
    private Date date =new Date();


}