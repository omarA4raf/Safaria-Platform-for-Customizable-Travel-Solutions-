package com.safaria.backend.DTO;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

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
    private List<TourScheduleDTO> schedules;

    // Add a list of images from frontend (multipart uploads)
//    private List<MultipartFile> images;
}
