package com.safaria.backend.DTO;

import lombok.Data;

@Data
public class AdminDTO {

    private Integer userId;
    private String username;
    private String email;
    private String phone;
    private String profilePhoto;
}