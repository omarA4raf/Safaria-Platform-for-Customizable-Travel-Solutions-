package com.safaria.backend.DTO;


import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourRequestDTO {
    private String title;
    private String description;
    private String destinationCountry;
//    private String category;
    private Integer tourProviderId;
    private String currency;
    private List<String> tourismTypes;
    private List<TourScheduleDTO> availableDates;

    // Add a list of images from frontend (multipart uploads)
//    private List<MultipartFile> images;
}
