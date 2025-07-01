package com.safaria.backend.controller.payment;


import com.safaria.backend.DTO.payment.PaymentIntentRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingResponse;
import com.safaria.backend.service.payment.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/integration/api/stripe")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class StripeController {
    @Autowired
    private final StripeService stripeService;
    @PostMapping("/create-account")
    public SellerOnboardingResponse createSellerAccount(@RequestBody SellerOnboardingRequest request) throws StripeException {
        return stripeService.createExpressAccount(request);
    }

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody PaymentIntentRequest request) throws StripeException {
        return stripeService.createPaymentIntent(request);
    }

}