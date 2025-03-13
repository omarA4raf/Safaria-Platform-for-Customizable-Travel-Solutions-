package com.safaria.backend;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
class SignUpTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
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
    void testSignupAsTourGuide() throws Exception {
        // Tour Guide request (Must include licenseNumber)
        String guideRequest = """
                {
            "username": "jane_guide",
            "password": "strongPass456",
            "email": "jane.guide@gmail.com",
            "phone": "9876543210",
            "country": "France",
            "approvalDocument": ["abcdefgh"]
            }
        """;

        mockMvc.perform(post("/api/tourguidesignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(guideRequest))
                .andExpect(status().isOk());
    }

    @Test
    void testSignupAsCompany() throws Exception {
        // Company request (Must include companyName)
        String companyRequest = """
        {
  "username": "travel_company",
  "password": "securePass789",
  "email": "info@gmail.com",
  "phone": "1234567890",
  "businessLicenseNumber": "LC-987654",
  "businessLicenseDocument": ["abcdefgh"]
        }


        """;

        mockMvc.perform(post("/api/companysignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(companyRequest))
                .andExpect(status().isOk());
    }
    @Test
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
    void testSignupAsTourGuideWithExistingEmail_ShouldFail() throws Exception {
        // Trying to sign up with an email that already exists
        String duplicateEmailRequest = """
          {
            "username": "jane_guide",
            "password": "strongPass456",
            "email": "jane.guide@gmail.com",
            "phone": "9876543210",
            "country": "France",
            "approvalDocument": ["abcdefgc"]
            }
        """;

        mockMvc.perform(post("/api/tourguidesignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(duplicateEmailRequest))
                .andExpect(status().isConflict())
                .andExpect(content().string("tourGuide Email is already registered!"));
    }
    void testSignupAsCompanyWithExistingEmail_ShouldFail() throws Exception {
        // Trying to sign up with an email that already exists
        String duplicateEmailRequest = """
                    {
            "username": "travel_company",
            "password": "securePass789",
            "email": "info@gmail.com",
            "phone": "1234567890",
            "businessLicenseNumber": "LC-987654",
            "businessLicenseDocument": ["abcdefgc"]
                    }
        """;

        mockMvc.perform(post("/api/companysignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(duplicateEmailRequest))
                .andExpect(status().isConflict())
                .andExpect(content().string("Company Email is already registered!"));
    }

    @Test
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
    @Test
    void testSignupAsCompanyWithExistingCompanyLicence_ShouldFail() throws Exception {
        // Trying to sign up with an email that already exists
        String duplicateCompanyLicenceRequest = """
            {
            "username": "travel_company",
            "password": "securePass789",
            "email": "info2@gmail.com",
            "phone": "1234567890",
            "businessLicenseNumber": "LC-987654",
            "businessLicenseDocument": ["abcdefgc"]
                    }
        """;

        mockMvc.perform(post("/api/companysignup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(duplicateCompanyLicenceRequest ))
                .andExpect(status().isConflict())
                .andExpect(content().string("Company License is already registered!"));
    }


}


