package com.safaria.backend.DTO;
import lombok.Data;


@Data
public class TourImportantDTO {
    private String tourID;
    private String title;
    private Float rating;
    private String tourProviderName;  
}