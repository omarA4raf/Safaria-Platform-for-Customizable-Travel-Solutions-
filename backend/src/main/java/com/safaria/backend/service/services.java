package com.safaria.backend.service;


import com.safaria.backend.entity.*;
import com.safaria.backend.repository.AdminRepository;
import com.safaria.backend.repository.TourGuideRepository;
import com.safaria.backend.repository.TouristRepository;
import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class services implements Iservices {

    public static String decryptAES(String encryptedText) {
        String SECRET_KEY="dsvbsduf76A1xZ9g";
        String IV="1234567890123456";
        try {
            // Base64 decode the encrypted text
            byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);

            // Initialize AES Cipher (CBC mode, PKCS5Padding)
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
            SecretKeySpec keySpec = new SecretKeySpec(SECRET_KEY.getBytes("UTF-8"), "AES");
            IvParameterSpec ivSpec = new IvParameterSpec(IV.getBytes("UTF-8"));

            cipher.init(Cipher.DECRYPT_MODE, keySpec, ivSpec);

            // Perform decryption
            byte[] decryptedBytes = cipher.doFinal(encryptedBytes);
            return new String(decryptedBytes, "UTF-8");

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }



    @Autowired
    private TouristRepository touristRepository;
    @Autowired
    private TourGuideRepository tourGuideRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;


    @Override
    public Tourist touristlogin(String email, String password) {

        email=URLDecoder.decode(email, StandardCharsets.UTF_8);
        password=URLDecoder.decode(password, StandardCharsets.UTF_8);
        try {
            email=decryptAES(email);
            password=decryptAES(password);
        }catch (Exception e){System.out.println(e.getMessage());}
        Optional<Tourist> tourist = touristRepository.findByEmail(email);
        System.out.println(tourist.isPresent());

        if (tourist.isPresent()) {
                if (passwordEncoder.matches(password, tourist.get().getPassword())) {
                    return tourist.get();
                } else {
                    return null;
                }

        }
        return null;
    }
    @Override
    public TourGuide tourguidelogin(String email, String password) {
        email=URLDecoder.decode(email, StandardCharsets.UTF_8);
        password=URLDecoder.decode(password, StandardCharsets.UTF_8);
        try {
            email=decryptAES(email);
            password=decryptAES(password);
        }catch (Exception e){System.out.println(e.getMessage());}
        Optional<TourGuide> tourguide = tourGuideRepository.findByEmail(email);
        if (tourguide.isPresent()) {
            if (passwordEncoder.matches(password, tourguide.get().getPassword())) {
                return tourguide.get();
            } else {
                return null;
            }

        }
        return null;
    }
    @Override
    public Admin adminlogin(String email, String password) {
        email=URLDecoder.decode(email, StandardCharsets.UTF_8);
        password=URLDecoder.decode(password, StandardCharsets.UTF_8);
        try {
            email=decryptAES(email);
            password=decryptAES(password);
        }catch (Exception e){System.out.println(e.getMessage());}
        Optional<Admin> admin = adminRepository.findByEmail(email);
        if (admin.isPresent()) {
            if (passwordEncoder.matches(password, admin.get().getPassword())) {
                return admin.get();
            } else {
                return null;
            }

        }
        return null;
    }
    @Override
    public Tourist savetourist(Tourist tourist) {
        tourist.setEmail(decryptAES(URLDecoder.decode(tourist.getEmail(),StandardCharsets.UTF_8)));
        tourist.setPassword(decryptAES(URLDecoder.decode(tourist.getPassword(),StandardCharsets.UTF_8)));
        System.out.println(tourist.getEmail() + " "+tourist.getPassword());
        Optional<Tourist> old_tourist_1 = touristRepository.findByEmail(tourist.getEmail());
        if (old_tourist_1.isPresent()) {
            return null;
        }
        tourist.setPassword(passwordEncoder.encode(tourist.getPassword()));
        return touristRepository.save(tourist);
    }
}
