package com.safaria.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;


@Setter
@Getter
@AllArgsConstructor
@Data
public class MessageDTO {
    private Integer tourist_id;
    private Integer tour_provider_id;
    private String Content;
    private Boolean direction;
}
