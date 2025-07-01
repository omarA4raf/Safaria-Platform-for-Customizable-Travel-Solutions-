package com.safaria.backend.DTO.payment;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SellerOnboardingResponse {
    private String accountId;
    private String onboardingUrl;
}
