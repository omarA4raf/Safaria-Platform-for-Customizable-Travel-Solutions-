package com.safaria.backend.entity;

import com.safaria.backend.DTO.BlogDTO;
import com.safaria.backend.DTO.BlogReviewDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Blog") // Explicitly set the table name
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blogId")
    private Integer blogId;

    @Column(name = "user_username")
    private String user_username;

    @Column(name = "content")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BlogDTO.Role role;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "photo")
    private String photo;




    public Blog(BlogDTO blogDTO,String file){
        this.user_username=blogDTO.getUser_username();
        this.content=blogDTO.getContent();
        this.photo=file;
        this.createdAt=LocalDateTime.now();
        this.role=blogDTO.getRole();
    }
}