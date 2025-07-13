package com.safaria.backend.DTO;

import com.safaria.backend.entity.BlogReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class BlogReviewDTO {

    private Integer reviewID;

    private Integer blogId;

    private String username;

    private Role role;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;

    public enum Role {
        Admin, Tourist, TourProvider
    }

    public BlogReviewDTO(BlogReview blogReview) {
        this.username = blogReview.getUsername();
        this.comment = blogReview.getComment();
        this.blogId = blogReview.getBlogId();
        this.role = blogReview.getRole();
        this.createdAt = blogReview.getCreatedAt();
        this.reviewID = blogReview.getReview_id();
    }

}
