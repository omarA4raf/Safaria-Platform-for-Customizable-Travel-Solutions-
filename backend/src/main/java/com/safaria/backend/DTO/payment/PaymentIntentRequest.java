package com.safaria.backend.DTO.payment;

import lombok.Data;

@Data
public class PaymentIntentRequest {
    private Integer scheduleId;
    private Integer numberOfSeats;
    private String currency; // Optional, or set in backend
    private String description;
    private Integer userId;
}