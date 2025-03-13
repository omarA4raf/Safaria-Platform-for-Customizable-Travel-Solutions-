package com.safaria.backend.service;


import com.safaria.backend.entity.*;
import com.safaria.backend.repository.AdminRepository;
import com.safaria.backend.repository.CompanyRepository;
import com.safaria.backend.repository.TourGuideRepository;
import com.safaria.backend.repository.TouristRepository;
import com.safaria.backend.DTO.CompanySignUpDTO;
import com.safaria.backend.DTO.TourGuideSignUpDTO;
import com.safaria.backend.DTO.TouristSignUpDTO;

import jakarta.transaction.Transactional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;

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
    private TourGuideRepository tourGuideRepository;
    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private CompanyRepository companyRepository;
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
    public ResponseEntity<String> saveTourGuide(TourGuideSignUpDTO tourGuide) {
       
        if (!checkEmailService.isValidEmailDomain(tourGuide.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(tourGuideRepository.existsByEmail(tourGuide.getEmail()))
        return  ResponseEntity.status(HttpStatus.CONFLICT).body("tourGuide Email is already registered!");
        
        tourGuide.setPassword(passwordEncoder.encode(tourGuide.getPassword()));
        String directory = "Documents/TourGuide";
        String uniqueFileName = this.fileSystemService.generateUniqueFileName(directory, "pdf");
        String relativeFilePath = Paths.get(directory, uniqueFileName).toString();

        try {
            this.fileSystemService.storeFile(this.fileSystemService.convertBase64ToBytes(tourGuide.getApprovalDocument()) ,relativeFilePath);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String[] approvalDocument = { relativeFilePath };
        tourGuide.setApprovalDocument(approvalDocument); 
        tourGuideRepository.save(new TourGuide(tourGuide));
     
        return ResponseEntity.status(200).body("DONE TourGuide SignedUP");
        
    }
    @Override
    public ResponseEntity<String> saveCompany(CompanySignUpDTO company) {
        
        if (!checkEmailService.isValidEmailDomain(company.getEmail()))
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Not Valid Email Domain");
        if(companyRepository.existsByEmail(company.getEmail()))
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("Company Email is already registered!");
        else if (companyRepository.existsByBusinessLicenseNumber(company.getBusinessLicenseNumber())) 
            return  ResponseEntity.status(HttpStatus.CONFLICT).body("Company License is already registered!");
        
        
        
        company.setPassword(passwordEncoder.encode(company.getPassword()));
        String directory = "Documents/Company";
        String uniqueFileName = this.fileSystemService.generateUniqueFileName(directory, "pdf");
        String relativeFilePath = Paths.get(directory, uniqueFileName).toString();

        try {
            this.fileSystemService.storeFile(this.fileSystemService.convertBase64ToBytes(company.getBusinessLicenseDocument()) ,relativeFilePath);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        String[] BusinessLicenseDocument = { relativeFilePath };
        company.setBusinessLicenseDocument(BusinessLicenseDocument); 
        companyRepository.save(new Company(company));
        return ResponseEntity.status(200).body("DONE Company SignedUP");
    }
}
