package com.safaria.backend.service.payment;

import com.safaria.backend.DTO.payment.PaymentIntentRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingResponse;
import com.safaria.backend.entity.TourSchedule;
import com.safaria.backend.repository.TourScheduleRepository;
import com.safaria.backend.repository.TourProviderRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.PaymentIntent;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.safaria.backend.entity.TourProvider;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Value("${Stripe.apiKey}")
    private String stripeSecretKey;

    @Autowired
    private TourScheduleRepository tourScheduleRepository;

    @Autowired
    private TourProviderRepository tourProviderRepository;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeSecretKey;
    }
    // this handles the creation of connected account (sellers) send dtorequest and get the response link to stripe to fill needed information (note the link is stopped 30)
    public SellerOnboardingResponse createExpressAccount(SellerOnboardingRequest request) throws StripeException {
        AccountCreateParams accountParams = AccountCreateParams.builder()
                .setType(AccountCreateParams.Type.EXPRESS)
                .setCountry(request.getCountry())
                .setEmail(request.getEmail())
                .build();

        Account account = Account.create(accountParams);

        // Save Stripe account ID to TourProvider
        TourProvider provider = tourProviderRepository.findByEmail(request.getEmail());
        if (provider != null) {
            provider.setStripeAccountId(account.getId());
            tourProviderRepository.save(provider);
        }

        AccountLinkCreateParams linkParams = AccountLinkCreateParams.builder()
                .setAccount(account.getId())
                .setRefreshUrl("https://your-frontend.com/reauth")
                .setReturnUrl("https://your-frontend.com/success")
                .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                .build();
        AccountLink accountLink = AccountLink.create(linkParams);

        return new SellerOnboardingResponse(account.getId(), accountLink.getUrl());
    }

    public Map<String, String> createPaymentIntent(PaymentIntentRequest request) throws StripeException {
        // Fetch schedule from DB
        TourSchedule schedule = tourScheduleRepository.findById(request.getScheduleId())
            .orElseThrow(() -> new RuntimeException("Schedule not found"));

        // Fetch provider from schedule's tour
        TourProvider provider = schedule.getTour().getTourProvider();
        if (provider == null || provider.getStripeAccountId() == null) {
            throw new RuntimeException("Tour provider or Stripe account not found");
        }

        double pricePerSeat = schedule.getPrice();
        int totalAmount = (int) Math.round(pricePerSeat * request.getNumberOfSeats() * 100); // Stripe expects cents

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) totalAmount)
                .setCurrency(request.getCurrency() != null ? request.getCurrency() : "usd")
                .addPaymentMethodType("card")
                .setTransferData(
                        PaymentIntentCreateParams.TransferData.builder()
                                .setDestination(provider.getStripeAccountId()) // Use DB value
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());
        return response;
    }
    
}