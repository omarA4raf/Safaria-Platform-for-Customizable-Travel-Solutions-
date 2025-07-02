package com.safaria.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginDTO {
    String token;
    Integer userId;
    String role;
    String username;
}
