package com.safaria.backend.controller;

import com.safaria.backend.service.FileSystemService;
import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@PreAuthorize("hasRole('ADMIN')")
public class FileController {

    private MediaType getMediaTypeForFileName(String filename) {
        if (filename.endsWith(".jpg") || filename.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else if (filename.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (filename.endsWith(".gif")) {
            return MediaType.IMAGE_GIF;
        } else {
            return MediaType.APPLICATION_PDF;
        }
    }

    @GetMapping("/files/{foldername}/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String foldername, @PathVariable String filename) {
        try {
            Path filePath = Paths.get("backend/src/main/resources/Upload/Documents").resolve(foldername).resolve(filename).normalize();
            UrlResource urlResource = new UrlResource(filePath.toUri());
            System.out.println(urlResource);
            if (urlResource.exists() && urlResource.isReadable()) {
                MediaType mediaType = getMediaTypeForFileName(filename);

                // ✅ Cast only here when passing into the body
                return ResponseEntity.ok()
                        .contentType(mediaType)
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + urlResource.getFilename() + "\"")
                        .header("X-Content-Type-Options", "nosniff")
                        .header("Cache-Control", "no-store")
                        .header("X-Frame-Options", "ALLOW-FROM http://localhost:4200")
                        .body(urlResource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
