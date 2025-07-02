package com.safaria.backend.DTO;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class TourScheduleDTO {
    private Integer id; // or tourScheduleID
    private Double price;
    private String startDate;
    private String endDate;
    private Integer availableSeats;
}
