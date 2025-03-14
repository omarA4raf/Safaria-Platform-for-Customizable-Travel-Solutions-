package com.safaria.backend.DTO;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class CompanySignUpDTO extends UserSignUpDTO{
    String businessLicenseNumber;
    MultipartFile businessLicenseDocument;

}
