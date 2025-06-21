package com.safaria.backend.DTO.payment;

import lombok.Data;
@Data
public class PaymentIntentRequest {
    private Long amount;
    private String currency;

}