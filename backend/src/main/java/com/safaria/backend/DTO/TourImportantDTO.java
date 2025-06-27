package com.safaria.backend.DTO;
import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class TourImportantDTO {
    private Integer tourID;
    private String title;
    private Float rating;
    private String tourProviderName;  
    
}