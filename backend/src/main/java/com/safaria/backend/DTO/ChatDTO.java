package com.safaria.backend.DTO;

import com.safaria.backend.entity.Chat;
import lombok.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Data
public class ChatDTO {

    private String id;
    private String avatar;
    private String name;
    private String lastMessage;
    private String time;
    private List<Message> messages;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    public static class Message {

        String text;
        String time;
        String senderId;

    }

    public String getDuration(LocalDateTime date) {
        LocalDateTime past = date;
        LocalDateTime now = LocalDateTime.now();

        long daysAgo = ChronoUnit.DAYS.between(past.toLocalDate(), now.toLocalDate());

        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("hh:mm a"); // e.g. 11:30 AM

        String timePart = past.format(timeFormatter);
        String result;

        if (daysAgo == 0) {
            result = "Today " + timePart;
        } else if (daysAgo == 1) {
            result = "Yesterday " + timePart;
        } else {
            result = daysAgo + " days ago " + timePart;
        }
        return result;
    }

    public ChatDTO(String name, List<Chat> chats) {
        this.name = name;
        this.lastMessage = chats.get(chats.size() - 1).getContent();
        this.time = getDuration(chats.get(chats.size() - 1).getCreatedAt());
        this.messages = new ArrayList<Message>();
        for (Chat c : chats) {
            Message message = new Message();
            message.text = c.getContent();
            message.time = getDuration(c.getCreatedAt());
            message.senderId = c.getSender_username();
            this.messages.add(message);
        }
    }
}
