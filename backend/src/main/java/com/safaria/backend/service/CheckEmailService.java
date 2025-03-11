package com.safaria.backend.service;

import org.xbill.DNS.Lookup;
import org.xbill.DNS.Record;
import org.xbill.DNS.Type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.UUID;
@org.springframework.stereotype.Service
public class CheckEmailService {
    // @Autowired
    // private JavaMailSender mailSender;

    public boolean isValidEmailDomain(String email) {
        String domain = email.substring(email.indexOf("@") + 1);
        try {
            Record[] records = new Lookup(domain, Type.MX).run();
            return records != null && records.length > 0;
        } catch (Exception e) {
            return false;
        }
    }
    // public void sendVerificationEmail(String toEmail) {
    //     String token = UUID.randomUUID().toString(); // Generate token
    //     String verificationLink = "https://yourwebsite.com/verify?token=" + token;

    //     SimpleMailMessage message = new SimpleMailMessage();
    //     message.setTo(toEmail);
    //     message.setSubject("Verify Your Email");
    //     message.setText("Click the link to verify your email: " + verificationLink);

    //     mailSender.send(message);
    // }
    
    
}
