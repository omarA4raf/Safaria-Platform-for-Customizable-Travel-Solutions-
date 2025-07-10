package com.safaria.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatBotRequest {

    private String message;

    public ChatBotRequest() {
    }

}
