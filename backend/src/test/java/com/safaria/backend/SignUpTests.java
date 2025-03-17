package com.safaria.backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;

@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)

class SignUpTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @Order(1)
    void testSignupAsTourist() throws Exception {
        // Tourist request (No extra fields required)
        String touristRequest = """
        {
            "username": "john_doe",
            "password": "securePassword123",
            "email": "john.doe@gmail.com",
            "phone": "1234567890",
            "country": "USA",
            "tourismTypes": ["adventure", "cultural", "eco-tourism"]
        }
        """;

        mockMvc.perform(post("/api/touristsignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(touristRequest))
                .andExpect(status().isOk());
    }

    @Test
    @Order(2)
    void testSignupAsTourGuide() throws Exception {
        // Mock file representing the approval document
        MockMultipartFile approvalDocument = new MockMultipartFile(
                "approvalDocument", // Field name
                "license.pdf", // File name
                "application/pdf", // MIME type
                "dummy file content".getBytes() // File content as bytes
        );

        mockMvc.perform(multipart("/api/tourguidesignup")
                .file(approvalDocument)
                .param("username", "jane_guide")
                .param("password", "strongPass456")
                .param("email", "jane.guide@gmail.com")
                .param("phone", "9876543210")
                .param("country", "France")
                .param("tourismTypes", "[\"adventure\", \"cultural\", \"eco-tourism\"]")
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
    }

    @Test
    @Order(3)
    void testSignupAsCompany() throws Exception {
        // Create a mock file for the business license document
        MockMultipartFile approvalDocument = new MockMultipartFile(
                "approvalDocument", // Field name
                "license.pdf", // File name
                "application/pdf", // MIME type
                "dummy file content".getBytes() // File content as bytes
        );

        // Send multipart form-data request
        mockMvc.perform(multipart("/api/companysignup")
                .file(approvalDocument)
                .param("username", "travel_company")
                .param("password", "securePass789")
                .param("email", "info@gmail.com")
                .param("phone", "1234567890")
                .param("tourismTypes", "[\"adventure\", \"cultural\", \"eco-tourism\"]")
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isOk());
    }
    @Test
    @Order(4)
    void testSignupAsTouristWithExistingEmail_ShouldFail() throws Exception {
        // Trying to sign up with an email that already exists
        String duplicateEmailRequest = """
           {
            "username": "john_doe",
            "password": "securePassword123",
            "email": "john.doe@gmail.com",
            "phone": "1234567890",
            "country": "USA",
            "tourismTypes": ["adventure", "cultural", "eco-tourism"]
        }
        """;

        mockMvc.perform(post("/api/touristsignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(duplicateEmailRequest))
                .andExpect(status().isConflict())
                .andExpect(content().string("tourist Email is already registered!"));
    }
    @Test
    @Order(5)
    void testSignupAsTourGuideWithExistingEmail_ShouldFail() throws Exception {
         // Mock file representing the approval document
         MockMultipartFile approvalDocument = new MockMultipartFile(
            "approvalDocument", // Field name
            "license.pdf", // File name
            "application/pdf", // MIME type
            "dummy file content".getBytes() // File content as bytes
    );

    mockMvc.perform(multipart("/api/tourguidesignup")
            .file(approvalDocument)
            .param("username", "jane_guide")
            .param("password", "strongPass456")
            .param("email", "jane.guide@gmail.com")
            .param("phone", "9876543210")
            .param("country", "France")
            .param("tourismTypes", "[\"adventure\", \"cultural\", \"eco-tourism\"]")
            .contentType(MediaType.MULTIPART_FORM_DATA))
            .andExpect(status().isConflict());
    }
    @Test
    @Order(6)
    void testSignupAsCompanyWithExistingEmail_ShouldFail() throws Exception {
        // Create a mock file for the business license document
        MockMultipartFile businessLicenseDocument = new MockMultipartFile(
                "approvalDocument", // Field name
                "license.pdf", // File name
                "application/pdf", // MIME type
                "dummy file content".getBytes() // File content as bytes
        );

        // Send multipart form-data request
        mockMvc.perform(multipart("/api/companysignup")
                .file(businessLicenseDocument)
                .param("username", "travel_company")
                .param("password", "securePass789")
                .param("email", "info@gmail.com")
                .param("phone", "1234567890")
                .param("tourismTypes", "[\"adventure\", \"cultural\", \"eco-tourism\"]")
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andExpect(status().isConflict());
    }

    @Test
    @Order(7)
    void testSignupWithInvalidEmail_ShouldFail() throws Exception {
        // Invalid email format (missing '@' and domain)
        String invalidEmailRequest = """
 {
            "username": "john_doe",
            "password": "securePassword123",
            "email": "john.doe",
            "phone": "1234567890",
            "country": "USA",
            "tourismTypes": ["adventure", "cultural", "eco-tourism"]
        }
        """;

        mockMvc.perform(post("/api/touristsignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidEmailRequest))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("{\"email\":\"Invalid email format\"}"));
    }
    @Test
    @Order(8)
    void testSignupWithInvalidEmailDomain_ShouldFail() throws Exception {
        // Invalid email format (missing '@' and domain)
        String invalidEmailRequest = """
 {
            "username": "john_doe",
            "password": "securePassword123",
            "email": "john.doe@g.com",
            "phone": "1234567890",
            "country": "USA",
            "tourismTypes": ["adventure", "cultural", "eco-tourism"]
        }
        """;

        mockMvc.perform(post("/api/touristsignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(invalidEmailRequest))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Not Valid Email Domain"));
    }
   


}


