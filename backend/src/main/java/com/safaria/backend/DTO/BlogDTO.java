package com.safaria.backend.DTO;

import com.safaria.backend.entity.Blog;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class BlogDTO {

    private Integer blogId;

    private String username;

    private String content;

    private Role role;

    private LocalDateTime createdAt;

    private MultipartFile[] photo;

    private String[] photo_path;

    public enum Role {
        Admin, Tourist, TourProvider
    }

    public BlogDTO(Blog blog) {
        this.username = blog.getUsername();
        this.content = blog.getContent();
        if (blog.getPhoto() != null) {
            this.photo_path = blog.getPhoto().clone();
        }
        this.createdAt = blog.getCreatedAt();
        this.role = blog.getRole();
        this.blogId = blog.getBlogId();
    }

}
