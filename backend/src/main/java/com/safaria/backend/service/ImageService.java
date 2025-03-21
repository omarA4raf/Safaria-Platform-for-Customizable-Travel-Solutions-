package com.safaria.backend.service;

import com.safaria.backend.entity.Image;
import com.safaria.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService {

    private final ImageRepository imageRepository;
    // auto wired isn't necessary here because it is constructor injection (it is required only in case of field injection and setter injection)
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
