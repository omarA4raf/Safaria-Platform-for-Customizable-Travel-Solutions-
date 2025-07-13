package com.safaria.backend.entity;

import com.safaria.backend.DTO.BlogDTO;

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
@Table(name = "Blog") // Explicitly set the table name
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blogId")
    private Integer blogId;

    @Column(name = "username")
    private String username;

    @Column(name = "content")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BlogDTO.Role role;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "photo")
    private String[] photo;

    public Blog(BlogDTO blogDTO, String[] file) {
        this.username = blogDTO.getUsername();
        this.content = blogDTO.getContent();
        if (file != null) {
            this.photo = file.clone();
        }
        this.createdAt = LocalDateTime.now();
        this.role = blogDTO.getRole();
        if (blogDTO.getBlogId() != null) {
            this.blogId = blogDTO.getBlogId();
        }
    }
}
