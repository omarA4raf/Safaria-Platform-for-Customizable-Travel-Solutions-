package com.safaria.backend.DTO;

import lombok.Data;

import java.time.Instant;

@Data
public class TourProviderRequestDTO {

    private Integer id;
    private String name;
    private String email;
    private String type; // "company" or "tourguide"
    private String documentUrl;
    private String status; // "pending", "approved", or "rejected"
    private Instant submittedAt; // or LocalDateTime if you prefer
}
