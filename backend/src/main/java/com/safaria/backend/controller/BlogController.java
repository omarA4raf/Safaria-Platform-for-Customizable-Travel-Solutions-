package com.safaria.backend.controller;

import com.safaria.backend.DTO.*;
import com.safaria.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/blog")
public class BlogController {

    @Autowired
    Iservices serv;

    @GetMapping("/getBlogs/")
    public ResponseEntity<List<BlogDTO>> getBlogs() {
        return this.serv.getBlogs();
    }

    @GetMapping("/getUserBlogs/{username}")
    public ResponseEntity<List<BlogDTO>> getUserBlogs(@PathVariable String username) {
        return this.serv.getUserBlogs(username);
    }

    @DeleteMapping("/deleteBlog/{blog_id}")
    public ResponseEntity<String> deleteBlog(@PathVariable Integer blog_id) {
        return this.serv.deleteBlog(blog_id);
    }

    @PostMapping(value = "/addBlog", consumes = "multipart/form-data")
    public ResponseEntity<String> addBlog(@Valid @ModelAttribute BlogDTO blogDTO) {
        return this.serv.addBlog(blogDTO);
    }

    @GetMapping("/getBlog/{blog_id}")
    public ResponseEntity<BlogDTO> getBlog(@PathVariable Integer blog_id) {
        return this.serv.getBlog(blog_id);
    }

}
