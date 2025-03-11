package com.safaria.backend.DTO;

import lombok.Data;
import java.util.List;


@Data
public class TouristSignUpDTO extends UserSignUpDTO {
    private String country;
    private List<String> tourismTypes;
   
}