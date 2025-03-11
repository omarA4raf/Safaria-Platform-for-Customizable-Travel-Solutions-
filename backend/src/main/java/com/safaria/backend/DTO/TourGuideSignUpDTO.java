package com.safaria.backend.DTO;

import lombok.Data;


@Data
public class TourGuideSignUpDTO extends UserSignUpDTO {

    
    private String country;
    private String approvalDocument;
}