package com.safaria.backend.DTO;

import java.time.LocalDateTime;
import lombok.Data;

@Data
public class BookingResponseDTO {

    private Long id;
    private Integer numberOfSeats;
    private LocalDateTime bookingTime;
    private Integer scheduleId;
    private Integer userId;
    private String status;
    private double totalPrice;

}
