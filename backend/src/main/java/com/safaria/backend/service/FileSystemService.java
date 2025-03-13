package com.safaria.backend.service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.*;
import java.util.Base64;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class FileSystemService {
    @Value("${file.upload-dir}")  // Inject directory path from properties
    private String uploadDir;
   public byte[] convertBase64ToBytes(String[] base64Array)
    {
        String base64String = String.join("", base64Array);
        return  Base64.getDecoder().decode(base64String);
    }


   public  void storeFile(byte[] fileData,String relativePath) throws IOException
    {   Path filePath = Paths.get(uploadDir, relativePath);
        Files.write(filePath, fileData, StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);


    }
    public String generateUniqueFileName(String relativePath,String extension) {
        Path directory = Paths.get(uploadDir).resolve(relativePath);
        System.out.println("####################"+directory);
        try {
            Files.createDirectories(directory); // Ensure directory exists
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory", e);
        }

        String fileName;
        Path filePath;
        do {
            fileName = UUID.randomUUID().toString() + "." +extension;
            filePath = directory.resolve(fileName);
        } while (Files.exists(filePath)); // Keep generating until we find a unique name
       System.out.println("_______________________"+fileName);
        return fileName;
    }
    
}
