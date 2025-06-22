package com.safaria.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@AllArgsConstructor
@Data
public class MessageRequestDTO {
    private Integer tourist_id;
    private Integer tour_provider_id;
}
