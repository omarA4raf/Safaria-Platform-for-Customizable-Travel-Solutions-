package com.safaria.backend.controller.payment;

import com.safaria.backend.DTO.payment.PaymentIntentRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingResponse;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.repository.TourProviderRepository;
import com.safaria.backend.service.payment.StripeService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/integration/api/stripe")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class StripeController {

    @Autowired
    private TourProviderRepository tourProviderRepository;
    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-account")
    public SellerOnboardingResponse createSellerAccount(@RequestBody SellerOnboardingRequest request) throws StripeException {
        return stripeService.createExpressAccount(request);
    }

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody PaymentIntentRequest request) throws StripeException {
        return stripeService.createPaymentIntent(request);
    }

    @GetMapping("/provider-stripe-status/{providerId}")
    public Map<String, Object> getStripeStatus(@PathVariable Integer providerId) {
        TourProvider provider = tourProviderRepository.findById(providerId).orElse(null);
        Map<String, Object> result = new HashMap<>();
        result.put("hasStripeAccount", provider != null && provider.getStripeAccountId() != null);
        if (provider != null) {
            result.put("email", provider.getEmail());
        }
        if (provider != null) {
            result.put("country", provider.getCountry());
        }
        return result;
    }

}
