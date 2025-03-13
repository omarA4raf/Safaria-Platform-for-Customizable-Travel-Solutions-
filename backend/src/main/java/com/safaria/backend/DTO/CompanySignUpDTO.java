package com.safaria.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class CompanySignUpDTO extends UserSignUpDTO{
    String businessLicenseNumber;
    String[] businessLicenseDocument;

}
