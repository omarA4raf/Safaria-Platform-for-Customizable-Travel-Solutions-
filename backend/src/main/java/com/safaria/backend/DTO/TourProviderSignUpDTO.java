package com.safaria.backend.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Data
public class TourProviderSignUpDTO extends UserSignUpDTO {

    
    private String country;
    private MultipartFile approvalDocument;
   
}