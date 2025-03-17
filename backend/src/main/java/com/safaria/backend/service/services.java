package com.safaria.backend.service;


import com.safaria.backend.DTO.TourProviderSignUpDTO;
import com.safaria.backend.entity.*;
import com.safaria.backend.repository.AdminRepository;
import com.safaria.backend.repository.TourProviderRepository;
import com.safaria.backend.repository.TouristRepository;
import com.safaria.backend.DTO.TouristSignUpDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.util.*;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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
    private TourProviderRepository tourProviderRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private CheckEmailService checkEmailService;
    @Autowired
     private  FileSystemService fileSystemService;


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
    public TourProvider tourProviderlogin(String email, String password) {
        email=URLDecoder.decode(email, StandardCharsets.UTF_8);
        password=URLDecoder.decode(password, StandardCharsets.UTF_8);
        try {
            email=decryptAES(email);
            password=decryptAES(password);
        }catch (Exception e){System.out.println(e.getMessage());}
        Optional<TourProvider> tourProvider = tourProviderRepository.findByEmail(email);
        if (tourProvider.isPresent()) {
            if (passwordEncoder.matches(password, tourProvider.get().getPassword())) {
                return tourProvider.get();
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

    public ResponseEntity<String> saveTourist(TouristSignUpDTO tourist) {
        
        if (!checkEmailService.isValidEmailDomain(tourist.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(touristRepository.existsByEmail(tourist.getEmail()))
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourist Email is already registered!");
        tourist.setPassword(passwordEncoder.encode(tourist.getPassword()));
        touristRepository.save(new Tourist(tourist));
        return ResponseEntity.status(200).body("DONE Tourist SignedUP");
        
    }
    @Override
    public ResponseEntity<String> saveTourProvider(TourProviderSignUpDTO tourProvider, Boolean isTourGuide) {
       
        if (!checkEmailService.isValidEmailDomain(tourProvider.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(tourProviderRepository.existsByEmail(tourProvider.getEmail()))
        return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourProvider Email is already registered!");

        tourProvider.setPassword(passwordEncoder.encode(tourProvider.getPassword()));
        String directory = "Documents/TourProvider";
        String uniqueFileName = this.fileSystemService.generateUniqueFileName(directory, "pdf");
        String relativeFilePath = Paths.get(directory, uniqueFileName).toString();

        try {

            this.fileSystemService.storeFile(tourProvider.getApprovalDocument().getBytes() ,relativeFilePath);

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        
        
        tourProviderRepository.save(new TourProvider(tourProvider,relativeFilePath,isTourGuide));

        
        

     
        return ResponseEntity.status(200).body("DONE TourProvider SignedUP");
        
    }

    @Override
    public Optional<List<TourProvider>> getPendingProviders() {
        Optional<List<TourProvider>>pendingProviders=this.tourProviderRepository.findByIsApproved(false);

        return pendingProviders;
    }

    @Override
    public ResponseEntity<String> deleteTourProvider(Integer id) {
        this.tourProviderRepository.deleteById(id);
        return ResponseEntity.status(200).body("Provider Disapproved");
    }
    @Override
    public ResponseEntity<String> approveTourProvider(Integer id){
        Optional<TourProvider> tourProvider= this.tourProviderRepository.findById(id);
        if(tourProvider.isPresent()) {
            tourProvider.get().setIsApproved(true);
            return ResponseEntity.status(200).body("Tour Provider Approved");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Tour Provider Not Found");
    }


}

