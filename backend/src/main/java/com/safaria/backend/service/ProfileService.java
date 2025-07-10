package com.safaria.backend.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.safaria.backend.DTO.UserInfoDTO;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.entity.Tourist;
import com.safaria.backend.repository.TourProviderRepository;
import com.safaria.backend.repository.TouristRepository;

@Service
public class ProfileService {

    @Autowired
    private TouristRepository touristRepository;
    @Autowired
    private TourProviderRepository providerRepository;

    public UserInfoDTO getUserByIdAndRole(Integer id, String role) {
        System.out.println(role);
        switch (role.toLowerCase()) {
            case "tourist": {
                Optional<Tourist> touristOpt = touristRepository.findById(id);
                if (touristOpt.isPresent()) {
                    return new UserInfoDTO(touristOpt.get());
                }
                break;
            }
            case "tourguide":
            case "company": {
                Optional<TourProvider> providerOpt = providerRepository.findById(id);
                if (providerOpt.isPresent()) {
                    return new UserInfoDTO(providerOpt.get());
                }
                break;
            }
            default:
                return null;
        }
        return null;
    }

}
