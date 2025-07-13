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
    private Double priceAmount;
    private String priceCurrency;

}
