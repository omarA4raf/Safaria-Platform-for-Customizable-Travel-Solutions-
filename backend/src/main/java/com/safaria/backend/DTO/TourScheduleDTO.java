package com.safaria.backend.DTO;

import lombok.Data;

@Data
public class TourScheduleDTO {

    private Integer id;
    private Double price;
    private String startDate;
    private String endDate;
    private Integer availableSeats;
}
