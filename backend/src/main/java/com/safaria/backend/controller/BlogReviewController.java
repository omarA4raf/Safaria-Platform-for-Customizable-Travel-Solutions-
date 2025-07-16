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
@RequestMapping("/blogReview")
public class BlogReviewController {

    @Autowired
    Iservices serv;

    @GetMapping("/getReviews/{blog_id}")
    public ResponseEntity<List<BlogReviewDTO>> getReviews(@PathVariable Integer blog_id) {
        return this.serv.getReviews(blog_id);
    }

    @PostMapping("/addReview/")
    public ResponseEntity<String> addReview(@Valid @RequestBody BlogReviewDTO blogReviewDTO) {
        return this.serv.addReview(blogReviewDTO);
    }

}
