package com.safaria.backend.DTO;

import com.safaria.backend.entity.Admin;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.entity.Tourist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserEditDto {
    private Integer id;
    private String name;
    private String email;
    private Integer role;
    
    public UserEditDto(Tourist user){
        this.id =user.getId();
        this.name=user.getUsername();
        this.email=user.getEmail();
        this.role=1;
    }
    public UserEditDto(TourProvider user){
        this.id =user.getUserId();
        this.name=user.getUsername();
        this.email=user.getEmail();
        this.role= user.getType()? 3:2;
    }
    public UserEditDto(Admin user){
        this.id =user.getUserId();
        this.name=user.getUsername();
        this.email=user.getEmail();
        this.role=4;
    }
}

