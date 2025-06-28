package com.safaria.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourSearchDTO {
    private Integer tourID;
    private String title;
    private Float rating;
    private String tourProviderName; 
    private String destinationCountry;
    private Double priceAmount; // Use Integer to allow null values
    private String priceCurrency; // Currency code (e.g., USD, EUR)

    
}
