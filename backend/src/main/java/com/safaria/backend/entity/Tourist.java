package com.safaria.backend.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import org.springframework.http.HttpStatus;

//import javax.persistence.*;
import java.util.List;

@Entity
@NoArgsConstructor
@Data
@Table(name = "tourist")
@AllArgsConstructor
public class Tourist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "Username")
    private String username;

    @Column(name = "Password")
    private String password;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Country")
    private String country;

    @Column(name = "Phone")
    private String phone;

    @Column(name = "ProfilePhoto")
    private String profilePhoto;

    @ElementCollection
    @CollectionTable(name = "tourist_tourism_types", joinColumns = @JoinColumn(name = "UserID"))
    @Column(name = "TourismType")
    private List<String> tourismTypes;

    public String getPassword() {
        return password;
    }
    public String getUsername(){
        return username;
    }
    public void setPassword(String pass){
        this.password=pass;
    }
    public void setUsername(String username){
        this.username=username;
    }
    public void setId(int id){
        this.userId=id;
    }
    public int getId(){
        return this.userId;
    }
}