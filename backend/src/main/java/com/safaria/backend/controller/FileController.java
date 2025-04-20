package com.safaria.backend.controller;

import com.safaria.backend.service.FileSystemService;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
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
    @GetMapping("files/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            Path filePath = Paths.get("Upload/Documents").resolve("TourProvider").resolve(filename).normalize();
            UrlResource urlResource = new UrlResource(filePath.toUri());
            System.out.println(filePath.toUri());
            if (urlResource.exists() && urlResource.isReadable()) {
                // ✅ Cast only here when passing into the body
                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_PDF)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + urlResource.getFilename() + "\"")
                        .body((Resource) urlResource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }


}
