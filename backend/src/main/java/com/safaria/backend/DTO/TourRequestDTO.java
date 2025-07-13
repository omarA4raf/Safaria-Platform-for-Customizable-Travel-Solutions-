package com.safaria.backend.DTO;

import java.util.List;
import lombok.Data;

@Data
public class TourRequestDTO {

    private String title;
    private String description;
    private String destinationCountry;
    private Integer tourProviderId;
    private String currency;
    private List<String> tourismTypes;
    private List<TourScheduleDTO> availableDates;

}
