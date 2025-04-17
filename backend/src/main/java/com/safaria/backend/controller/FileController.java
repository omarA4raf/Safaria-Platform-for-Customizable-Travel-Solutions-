package com.safaria.backend.controller;

import com.safaria.backend.service.FileSystemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;
import java.util.*;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/")
public class FileController {
    @Autowired
    private FileSystemService fileSystemService;
    @GetMapping("files/{folder}/{filename:.+}")
    public ResponseEntity<byte[]> getPdf(
            @PathVariable String folder,
            @PathVariable String filename) throws IOException {

        // Build relative path
        String relativePath = "Documents/" + folder + "/" + filename;

        byte[] fileBytes = loadFile(relativePath); // implement this

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDisposition(ContentDisposition.inline().filename(filename).build());

        return new ResponseEntity<>(fileBytes, headers, HttpStatus.OK);
    }
    public byte[] loadFile(String relativePath) throws IOException {
        Path path = Paths.get(relativePath);
        if (!Files.exists(path)) {
            throw new IOException("File not found: " + relativePath);
        }
        return Files.readAllBytes(path);
    }

}
