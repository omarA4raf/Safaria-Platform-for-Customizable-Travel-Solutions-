package com.safaria.backend.DTO;

import com.safaria.backend.entity.Chat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@Data
public class MessageDTO {

    private String sender_username;
    private String receiver_username;
    private String content;
    private Integer message_id;
    private LocalDateTime createdAt;

    public MessageDTO(Chat chat) {
        this.sender_username = chat.getSender_username();
        this.receiver_username = chat.getReceiver_username();
        this.content = chat.getContent();
        this.message_id = chat.getMessage_id();
        this.createdAt = chat.getCreatedAt();
    }

    public MessageDTO() {
    }
}
