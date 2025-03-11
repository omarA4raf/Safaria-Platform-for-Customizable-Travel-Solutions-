package com.safaria.backend.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Data
@Getter
@Setter
public class TouristSignUpDTO extends UserSignUpDTO {
    private String country;
    private List<String> tourismTypes;
    public String getCountry(){
        return this.country;
    }
    public List<String> getTourismTypes(){
        return this.tourismTypes;
    }
   
}