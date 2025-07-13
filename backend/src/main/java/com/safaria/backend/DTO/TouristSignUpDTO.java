package com.safaria.backend.DTO;

import lombok.Data;

@Data
public class TouristSignUpDTO extends UserSignUpDTO {

    private String country;

    public String getCountry() {
        return this.country;
    }

}
