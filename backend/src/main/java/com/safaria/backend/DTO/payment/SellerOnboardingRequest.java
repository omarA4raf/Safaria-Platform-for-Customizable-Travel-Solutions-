package com.safaria.backend.DTO.payment;
import lombok.Data;

@Data
public class SellerOnboardingRequest {
    private String email;
    private String country; // e.g., "US"
}
