package com.safaria.backend.DTO;

import lombok.Data;
import java.util.List;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Data
public class UserSignUpDTO {

    @NotBlank(message = "Password cannot be empty")
    protected String password;
    protected String username;
    @NotBlank
    @Email(message = "Invalid email format")
    protected String email;
    protected String phone;
    protected List<String> tourismTypes;

}
