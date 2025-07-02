package com.safaria.backend.entity;

import com.safaria.backend.DTO.MessageDTO;
import com.safaria.backend.DTO.UserEditDto;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Chat") // Explicitly set the table name
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Integer message_id;
    @Column(name = "sender_username")
    private String sender_username;

    @Column(name = "receiver_username")
    private String receiver_username;

    @Column(name = "content")
    private String content;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // tourist --> tour_provider : 0


    public Chat(MessageDTO messageDTO){
        this.sender_username=messageDTO.getSender_username();
        this.receiver_username= messageDTO.getReceiver_username();
        this.content=messageDTO.getContent();
        this.createdAt=LocalDateTime.now();
    }
}