package com.safaria.backend.controller;

import com.safaria.backend.DTO.*;
import com.safaria.backend.entity.*;
import com.safaria.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/auth/blog")
public class BlogController {
    @Autowired
    Iservices serv;


    @GetMapping("/getBlogs/")
    public ResponseEntity<List<BlogDTO>> getBlogs(){
        return this.serv.getBlogs();
    }
    @PostMapping("/addBlog/")
    public ResponseEntity<String> addBlog(@Valid @RequestBody BlogDTO blogDTO){
        return this.serv.addBlog(blogDTO);
    }

}
