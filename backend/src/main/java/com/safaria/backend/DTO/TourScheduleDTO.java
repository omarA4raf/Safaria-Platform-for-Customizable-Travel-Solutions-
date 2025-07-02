package com.safaria.backend.DTO;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TourScheduleDTO {
//    private Integer duration;
    private Double price; ;
    private String startDate;
    private String endDate;
    private Integer availableSeats;
}
