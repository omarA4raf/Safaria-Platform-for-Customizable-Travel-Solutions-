package com.safaria.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class CompanySignUpDTO extends UserSignUpDTO{
    String businessLicenseNumber;
    String businessLicenseDocument;

    public String getBusinessLicenseDocument() {
        return this.businessLicenseDocument;
    }

    public String getBusinessLicenseNumber() {
        return this.businessLicenseNumber;
    }
}
