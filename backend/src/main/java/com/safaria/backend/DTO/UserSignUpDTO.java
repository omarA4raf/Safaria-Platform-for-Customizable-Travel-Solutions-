package com.safaria.backend.DTO;
import lombok.Data;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserSignUpDTO {
    @NotBlank(message = "Password cannot be empty")
    protected String password;
    protected String username;
    @NotBlank
    @Email(message = "Invalid email format")
    protected String email;
    protected String phone;
    protected List<String> tourismTypes;
    public String getUsername(){
        return this.username;
    }
    public String getPassword(){
        return this.password;
    }
    public String getEmail(){
        return this.email;
    }
    public String getPhone(){
        return this.phone;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
    public List<String> getTourismTypes(){return this.tourismTypes;}

}