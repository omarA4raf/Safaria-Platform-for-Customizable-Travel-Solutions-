package com.safaria.backend.DTO;
public class ChatBotResponse {
    private String reply;

    public ChatBotResponse() {}

    public ChatBotResponse(String reply) {
        this.reply = reply;
    }

    public String getReply() {
        return reply;
    }

    public void setReply(String reply) {
        this.reply = reply;
    }
}