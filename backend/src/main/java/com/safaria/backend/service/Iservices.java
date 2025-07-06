package com.safaria.backend.service;

import com.safaria.backend.DTO.*;
import com.safaria.backend.entity.*;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;


public interface Iservices {

    
     public ResponseEntity<Admin> adminlogin(String username, String password);
    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist);
    public ResponseEntity<String> saveTourProvider(TourProviderSignUpDTO tourProvider,Boolean type);
    public Optional<List<TourProviderRequestDTO>> getPendingProviders();
    public ResponseEntity<String> deleteTourProvider(Integer id);
    public ResponseEntity<String> approveTourProvider(Integer id);
    public ResponseEntity<String> deleteTourist(Integer id);
    public List<UserEditDto> getUsers();
    public ResponseEntity<String> updateUser(UserEditDto user,Integer id,Integer role);
    public ResponseEntity<String> addUser(UserEditDto user);
    public ResponseEntity<List<MessageDTO>> getMessages(MessageRequestDTO requestDTO);
    public ResponseEntity<String> setMessage(MessageDTO messageDTO);
    public ResponseEntity<String> deleteMessage(Integer message_id);

    public ResponseEntity<String> addReport(ReportDTO reportDTO);

    public ResponseEntity<List<ReportDTO>> getReports();
    public ResponseEntity<String> deleteReport(Integer reportId);

    public ResponseEntity<String> addBlog(BlogDTO blogDTO);
    public ResponseEntity<List<BlogDTO>>  getBlogs();

    public ResponseEntity<String> addReview(BlogReviewDTO blogReviewDTO);
    public ResponseEntity<List<BlogReviewDTO>> getReviews(Integer blog_id);

    public ResponseEntity<List<ChatDTO>> getChats(String username);
    public ResponseEntity<List<BlogDTO>> getUserBlogs(String username);
    public ResponseEntity<String> deleteBlog(Integer blog_id);
    public ResponseEntity<BlogDTO> getBlog(Integer blog_id);

}
