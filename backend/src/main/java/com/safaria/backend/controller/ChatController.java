package com.safaria.backend.controller;

import com.safaria.backend.DTO.ChatDTO;
import com.safaria.backend.DTO.MessageDTO;
import com.safaria.backend.DTO.MessageRequestDTO;
import com.safaria.backend.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/chat")
public class ChatController {

    @Autowired
    Iservices serv;

    @GetMapping("/getMessages/")
    public ResponseEntity<List<MessageDTO>> getMessages(@Valid @RequestBody MessageRequestDTO requestDTO) {
        return this.serv.getMessages(requestDTO);
    }

    @PostMapping("/setMessage/")
    public ResponseEntity<String> setMessage(@Valid @RequestBody MessageDTO messageDTO) {
        return this.serv.setMessage(messageDTO);
    }

    @DeleteMapping("/deleteMessage/{message_id}")
    public ResponseEntity<String> deleteMessage(@PathVariable Integer message_id) {
        return this.serv.deleteMessage(message_id);
    }

    @GetMapping("/getChats/{username}")
    public ResponseEntity<List<ChatDTO>> getChats(@PathVariable String username) {
        return this.serv.getChats(username);
    }
}
