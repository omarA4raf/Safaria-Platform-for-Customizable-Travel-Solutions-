package com.safaria.backend.service;

import com.safaria.backend.DTO.ChatBotResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import java.util.Map;
import java.util.List;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.builder()
            .baseUrl("https://generativelanguage.googleapis.com")
            .build();

    public Mono<ChatBotResponse> getGeminiReply(String message) {
        String endpoint = "/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey;

        // Updated context with real Angular routes
        String context = """
            You are a helpful virtual assistant for a tourism web application called Safaria.
            Your main goal is to assist users in discovering and booking trips, finding information about tour guides,
             and recommending the best places to visit.
            The user is navigating a site with the following pages:
            - Home: /
            - Login: /login
            - Sign Up: /signup
            - Tourist Sign Up: /touristsignup
            - Tour Guide Sign Up: /tourguidesignup
            - Company Sign Up: /companysignup
            - Company Dashboard: /companydashboard
            - Tour Guide Dashboard: /tourguidesdashboard
            - Tourist Dashboard Home: /touristdashboardhome
            - Tourist Dashboard Profile: /touristdashboardprofile
            - Company Create Trip: /companycreatetrip
            - Tour Guide Create Trip: /tourguidecreatetrip
            - Admin Dashboard: /admindashboard
            - Admin Dashboard Tour Provider: /admindashboardtourprovider
            - Tourist Customize Tour Step 1: /touristcustomizetourfirstcomponent
            - Tourist Prepackage Show: /touristprepackageshowcomponent
            - Tourist Pay Trip: /touristpaytripcomponent
            - Tourist Payment Success: /touristpaymentsuccesscomponent
            - Tourist Payment Failed: /touristpaymentfailedcomponent
            - Tourist Blogging Page: /touristblogigngpagecomponent
            - Payment: /payment
            - Tourist My Blogging Page: /touristmyblogigngpagecomponent
            - Tourist View Trip (with params): /tourist-view-trip/:id/:tourProvider

            When the user asks about trips, tour guides, or the best places to visit, provide clear and concise answers. 
            If possible, recommend relevant pages from the list above using the format [Page Name](/route).
            For example, if the user wants to see available trips, suggest the "Tourist View Trip" page. 
            If they want to know about tour guides, suggest the "Tour Guide Dashboard" or "Tour Guide Sign Up" pages.
            For information about the best places to visit, you can mention popular destinations and suggest related pages if available.
            Do not generate random links. Only use the paths above.

            User message: %s
            """.formatted(message);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", context)
                        ))
                )
        );

        return webClient.post()
                .uri(endpoint)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> {
                    try {
                        List<Map<String, Object>> candidates = (List<Map<String, Object>>) response.get("candidates");
                        Map<String, Object> firstCandidate = candidates.get(0);
                        Map<String, Object> content = (Map<String, Object>) firstCandidate.get("content");
                        List<Map<String, Object>> parts = (List<Map<String, Object>>) content.get("parts");
                        Map<String, Object> firstPart = parts.get(0);
                        String text = (String) firstPart.get("text");
                        return new ChatBotResponse(text);
                    } catch (Exception e) {
                        return new ChatBotResponse("Sorry, I couldn't understand that.");
                    }
                });
    }
}
