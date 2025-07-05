package com.safaria.backend.service;



import com.safaria.backend.DTO.ChatBotResponse;
import com.safaria.backend.DTO.ChatBotRequest;
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

        Map<String, Object> requestBody = Map.of(
            "contents", List.of(
                Map.of("parts", List.of(
                    Map.of("text", message)
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
