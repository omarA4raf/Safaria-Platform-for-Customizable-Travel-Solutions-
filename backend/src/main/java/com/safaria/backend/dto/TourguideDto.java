package com.safaria.backend.DTO;

import lombok.Data;
import java.util.List;

@Data
public class TourGuideDTO {

    private Integer userId;
    private String username;
    private String email;
    private String country;
    private String phone;
    private String profilePhoto;
    private List<String> tourismTypes;
    private String approvalDocument;
}