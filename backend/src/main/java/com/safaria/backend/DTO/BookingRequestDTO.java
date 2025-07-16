package com.safaria.backend.DTO;

import lombok.Data;

@Data
public class BookingRequestDTO {

    private Integer scheduleId;
    private Integer numberOfSeats;
    private Integer userId;

}
