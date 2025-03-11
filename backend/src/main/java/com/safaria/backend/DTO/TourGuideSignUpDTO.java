package com.safaria.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
@Getter
@Setter
public class TourGuideSignUpDTO extends UserSignUpDTO {

    
    private String country;
    private String approvalDocument;
    public String getCountry(){
        return this.country;
    }
    public String getApprovalDocument(){
        return this.approvalDocument;
    }
}