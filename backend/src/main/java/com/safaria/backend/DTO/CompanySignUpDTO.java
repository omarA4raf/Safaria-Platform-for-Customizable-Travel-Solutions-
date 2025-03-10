package com.safaria.backend.DTO;

import lombok.Data;

@Data
public class CompanySignUpDTO extends UserSignUpDTO{
    String businessLicenseNumber;
    String businessLicenseDocument;
}
