package com.safaria.backend.entity;

import com.safaria.backend.DTO.BlogReviewDTO;
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
@Table(name = "BlogReview") // Explicitly set the table name
public class BlogReview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer review_id;

    @Column(name = "username")
    private String username;

    @Column(name = "comment")
    private String comment;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BlogReviewDTO.Role role;
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "blogId")
    private Integer blogId;

    public BlogReview(BlogReviewDTO blogReviewDTO) {
        this.username = blogReviewDTO.getUsername();
        this.comment = blogReviewDTO.getComment();
        this.blogId = blogReviewDTO.getBlogId();
        this.role = blogReviewDTO.getRole();
        this.createdAt = LocalDateTime.now();
    }

}
