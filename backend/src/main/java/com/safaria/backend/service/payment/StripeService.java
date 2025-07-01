package com.safaria.backend.service.payment;

import com.safaria.backend.DTO.payment.PaymentIntentRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingRequest;
import com.safaria.backend.DTO.payment.SellerOnboardingResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.model.PaymentIntent;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    @Value("${Stripe.apiKey}")
    private String stripeSecretKey;

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

        AccountLinkCreateParams linkParams = AccountLinkCreateParams.builder()
                .setAccount(account.getId())
                .setRefreshUrl("https://your-frontend.com/reauth")
                .setReturnUrl("https://your-frontend.com/success")
                .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                .build();
        // on this line the tourprovider is sent to stripe work on it
        AccountLink accountLink = AccountLink.create(linkParams);

        return new SellerOnboardingResponse(account.getId(), accountLink.getUrl());
    }

    public Map<String, String> createPaymentIntent(PaymentIntentRequest request) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(request.getAmount()) // amount in cents I think that this should be replaced with the request productId then I use the data saved in the database  
                .setCurrency(request.getCurrency())
                .addPaymentMethodType("card")
                .setTransferData(
                        PaymentIntentCreateParams.TransferData.builder()
                                .setDestination("acct_1RLgVfHKzXsGFC49") // Replace with your real connected account ID
                                .build()
                )
                .build();

        PaymentIntent intent = PaymentIntent.create(params);
        Map<String, String> response = new HashMap<>();
        response.put("clientSecret", intent.getClientSecret());
        return response;
    }
    
}