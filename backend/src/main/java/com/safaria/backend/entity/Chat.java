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
    @Column(name = "tourist_id")
    private Integer tourist_id;

    @Column(name = "tour_provider_id")
    private Integer tour_provider_id;

    @Column(name = "Content")
    private String Content;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    // tourist --> tour_provider : 0
    @Column(name = "direction")
    private Boolean direction;

    public Chat(MessageDTO messageDTO){
        this.tourist_id=messageDTO.getTourist_id();
        this.tour_provider_id= messageDTO.getTour_provider_id();
        this.Content=messageDTO.getContent();
        this.direction=messageDTO.getDirection();
        this.createdAt=LocalDateTime.now();
    }
}