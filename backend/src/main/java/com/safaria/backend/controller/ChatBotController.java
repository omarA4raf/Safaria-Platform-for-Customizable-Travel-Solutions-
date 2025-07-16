package com.safaria.backend.controller;

import com.safaria.backend.DTO.ChatBotRequest;
import com.safaria.backend.DTO.ChatBotResponse;
import com.safaria.backend.service.GeminiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RequestMapping("/auth/api/chatBot")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from Angular frontend
@RestController
public class ChatBotController {

    @Autowired
    private GeminiService geminiService;

    @PostMapping
    public Mono<ChatBotResponse> chat(@RequestBody ChatBotRequest request) {
        return geminiService.getGeminiReply(request.getMessage());
    }
}
