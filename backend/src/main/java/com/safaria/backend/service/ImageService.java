package com.safaria.backend.service;

import com.safaria.backend.entity.Image;
import com.safaria.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ImageService {

    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public List<Image> getImagesByTour(Integer tourId) {
        return imageRepository.findByTour_TourId(tourId);
    }

    public void deleteImage(Integer imageId) {
        imageRepository.deleteById(imageId);
    }
}
