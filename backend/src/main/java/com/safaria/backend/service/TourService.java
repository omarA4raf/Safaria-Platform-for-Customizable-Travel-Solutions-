package com.safaria.backend.service;


import com.safaria.backend.DTO.TourImportantDTO;
import com.safaria.backend.DTO.TourRequestDTO;
import com.safaria.backend.DTO.TourScheduleDTO;
import com.safaria.backend.DTO.TourSearchDTO;
import com.safaria.backend.entity.Tour;
import com.safaria.backend.entity.TourSchedule;
import com.safaria.backend.entity.TourProvider;
import com.safaria.backend.repository.TourRepository;
import com.safaria.backend.repository.TourScheduleRepository;
import com.safaria.backend.repository.TourProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.safaria.backend.entity.Image;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TourService {
    // Directory for storing images
@Value("${file.upload-dir}")
private String UPLOAD_DIRECTORY;

    private final TourRepository tourRepository;
    private final TourScheduleRepository tourScheduleRepository;
    private final TourProviderRepository tourProviderRepository;
    @Autowired
    private  FileSystemService fileSystemService;

    public TourService(TourRepository tourRepository, TourScheduleRepository tourScheduleRepository, TourProviderRepository tourProviderRepository) {
        this.tourRepository = tourRepository;
        this.tourScheduleRepository = tourScheduleRepository;
        this.tourProviderRepository = tourProviderRepository;
    }

    // ✅ Create Tour with Multiple Schedules
    @Transactional
    public String createTourWithSchedules(TourRequestDTO dto,List<MultipartFile> images) {
        System.out.println("___________entered...................");
        Tour tour = new Tour();
        tour.setTitle(dto.getTitle());
        tour.setDescription(dto.getDescription());
        tour.setDestinationCountry(dto.getDestinationCountry());
//        tour.setCategory(Tour.Category.valueOf(dto.getCategory()));
        tour.setCurrency(dto.getCurrency());
        tour.setTourismTypes(dto.getTourismTypes());
        // tttttttttttttttttttttttttttttttttttttttttttttttttthis for test only remove 2 and return the value
        TourProvider tourProvider = tourProviderRepository.findById(dto.getTourProviderId())
                .orElseThrow(() -> new RuntimeException("Tour Provider not found"));
        tour.setTourProvider(tourProvider);
        // Save images to filesystem and create Image objects for the tour
        List<Image> imageEntities = saveImagesAndCreateEntities(images, tour);
        tour.setImages(imageEntities);
        Tour savedTour = tourRepository.save(tour);

        List<TourSchedule> schedules = dto.getAvailableDates().stream().map(scheduleDTO -> createSchedule(scheduleDTO, savedTour)).collect(Collectors.toList());
        tourScheduleRepository.saveAll(schedules);
        System.out.println("so what is the issue?");
        return "tour is created successfully";
    }
    // Helper method to save images to the filesystem and create Image entities
    private List<Image> saveImagesAndCreateEntities(List<MultipartFile> images, Tour tour) {
        List<Image> imageEntities = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (MultipartFile image : images) {
                try {
                    // Generate unique filename
                    String fileName = System.currentTimeMillis() + "_" + image.getOriginalFilename();
                    Path path = Paths.get(UPLOAD_DIRECTORY,"tours", fileName);

                    // Create directories if they don't exist
                    Files.createDirectories(path.getParent());

                    // Save image to filesystem
                    image.transferTo(path.toFile());

                    // Create Image entity and set imageUrl (relative path)
                    Image imageEntity = new Image();
                    imageEntity.setImageUrl("tours/" + fileName);  // Store relative path
                    imageEntity.setTour(tour);  // Link image to the tour

                    // Add to list
                    imageEntities.add(imageEntity);

                } catch (IOException e) {
                    throw new RuntimeException("Failed to save image: " + image.getOriginalFilename(), e);
                }
            }
        }
        return imageEntities;
    }

    private TourSchedule createSchedule(TourScheduleDTO scheduleDTO, Tour tour) {
        TourSchedule schedule = new TourSchedule();
//        schedule.setDuration(scheduleDTO.getDuration());
System.out.println("Creating schedule with price: " + scheduleDTO.getPrice());

        schedule.setPrice(scheduleDTO.getPrice());
        System.out.println("             \n\n\n"+scheduleDTO.getPrice()+"             \n\n\n");
        
        schedule.setAvailableSeats(scheduleDTO.getAvailableSeats());

        try {
            schedule.setStartDate(LocalDate.parse(scheduleDTO.getStartDate()));
            schedule.setEndDate(LocalDate.parse(scheduleDTO.getEndDate()));
        } catch (DateTimeParseException e) {
            throw new RuntimeException("Invalid date format, use YYYY-MM-DD");
        }

        schedule.setTour(tour);
        return schedule;
    }

    // ✅ Get All Tours
    public List<TourRequestDTO> getAllTours() {
        List<Tour> tours = tourRepository.findAll();
        List<TourRequestDTO> tourRequestDTOList = new ArrayList<>();
        List<TourScheduleDTO> tourScheduleDTOs = new ArrayList<>();
        for (Tour tour : tours) {
            List<TourSchedule> tourSchedules = tourScheduleRepository.findByTour_TourId(tour.getTourId());
            for(TourSchedule tourSchedule :tourSchedules){
                TourScheduleDTO tourScheduleDTO = new TourScheduleDTO();
                tourScheduleDTO.setPrice(tourSchedule.getPrice());
                tourScheduleDTO.setStartDate(String.valueOf(tourSchedule.getStartDate()));
                tourScheduleDTO.setEndDate(String.valueOf(tourSchedule.getEndDate()));
                tourScheduleDTO.setAvailableSeats(tourSchedule.getAvailableSeats());
                tourScheduleDTOs.add(tourScheduleDTO);
            }

            TourRequestDTO tourRequestDTO = new TourRequestDTO();
            // Map fields from `Tour` to `TourRequestDTO`
            // Set the fields from Tour object to TourRequestDTO
            tourRequestDTO.setTitle(tour.getTitle());
            tourRequestDTO.setDescription(tour.getDescription());
            tourRequestDTO.setDestinationCountry(tour.getDestinationCountry());
//            tourRequestDTO.setCategory(String.valueOf(tour.getCategory()));
            tourRequestDTO.setTourProviderId(tour.getTourProvider().getUserId());
            tourRequestDTO.setCurrency(tour.getCurrency());
            tourRequestDTO.setTourismTypes(tour.getTourismTypes());
            tourRequestDTO.setAvailableDates(tourScheduleDTOs);
            tourRequestDTO.setDescription(tour.getDescription());
            // Map more fields as needed...

            tourRequestDTOList.add(tourRequestDTO); // Add the DTO to the list
        }
        return tourRequestDTOList;
    }

    // ✅ Get a Tour by ID (Including Its Schedules)
    public Tour getTourById(Integer tourId) {
        return tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
    }

    // Add this method to map Tour to TourRequestDTO
    public TourRequestDTO getTourDTOById(Integer tourId) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        TourRequestDTO dto = new TourRequestDTO();
        dto.setTitle(tour.getTitle());
        dto.setDescription(tour.getDescription());
        dto.setDestinationCountry(tour.getDestinationCountry());
        dto.setCurrency(tour.getCurrency());
        dto.setTourismTypes(tour.getTourismTypes());
        dto.setTourProviderId(tour.getTourProvider().getUserId());
        // Map images (as URLs or IDs)
        // dto.setImages(
        //     tour.getImages() != null
        //         ? tour.getImages().stream().map(img -> img.getImageUrl()).toList()
        //         : new ArrayList<>()
        // );
        // Map available dates (schedules)
        List<TourSchedule> schedules = tourScheduleRepository.findByTour_TourId(tourId);
        dto.setAvailableDates(
            schedules.stream().map(sch -> {
                TourScheduleDTO schDto = new TourScheduleDTO();
                schDto.setPrice(sch.getPrice());
                schDto.setStartDate(sch.getStartDate() != null ? sch.getStartDate().toString() : null);
                schDto.setEndDate(sch.getEndDate() != null ? sch.getEndDate().toString() : null);
                schDto.setAvailableSeats(sch.getAvailableSeats());
                return schDto;
            }).toList()
        );
        // Optionally add more fields as needed
        return dto;
    }

    // ✅ Update a Tour
    @Transactional
    public Tour updateTour(Integer tourId, TourRequestDTO dto) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        tour.setTitle(dto.getTitle());
        tour.setDescription(dto.getDescription());
        tour.setDestinationCountry(dto.getDestinationCountry());
//        tour.setCategory(Tour.Category.valueOf(dto.getCategory()));
        tour.setCurrency(dto.getCurrency());
        tour.setTourismTypes(dto.getTourismTypes());
        TourProvider tourProvider = tourProviderRepository.findById(dto.getTourProviderId())
                .orElseThrow(() -> new RuntimeException("Tour Provider not found"));
        tour.setTourProvider(tourProvider);

        return tourRepository.save(tour);
    }

    // ✅ Delete a Tour (Cascade Delete Its Schedules)
    @Transactional
    public void deleteTour(Integer tourId) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));
        tourRepository.delete(tour);
    }

    // ✅ Add New Schedules to an Existing Tour
    @Transactional
    public String addSchedulesToTour(Integer tourId, List<TourScheduleDTO> scheduleDTOs) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        List<TourSchedule> newSchedules = scheduleDTOs.stream()
                .map(scheduleDTO -> createSchedule(scheduleDTO, tour))
                .collect(Collectors.toList());

        tourScheduleRepository.saveAll(newSchedules);
        return "Schedules added successfully";
    }

    // ✅ Delete a Specific Schedule from a Tour
    @Transactional
    public void deleteSchedule(Integer scheduleId) {
        Optional<TourSchedule> schedule = tourScheduleRepository.findById(scheduleId);
        if (schedule.isPresent()) {
            tourScheduleRepository.delete(schedule.get());
        } else {
            throw new RuntimeException("Tour Schedule not found");
        }
    }
    // ✅ Get 5 Important Tours
    // public List<TourImportantDTO> getFiveImportantTours() {
    //     List<Tour> tours = tourRepository.findAll().stream().limit(5).collect(Collectors.toList());
    //     List<TourImportantDTO> tourImportantDTOList = new ArrayList<>();
        
    //     for (Tour tour : tours) {
    //         TourImportantDTO tourImportantDTO = new TourImportantDTO();
    //         tourImportantDTO.setTitle(tour.getTitle());
    //         tourImportantDTO.setRating(tour.getRating());
    //         tourImportantDTO.setTourID(tour.getTourId().toString());
    //         System.out.println(tour.getTourProvider().getUsername());
    //         tourImportantDTO.setTourProviderName(tour.getTourProvider().getUsername());
    //         tourImportantDTOList.add(tourImportantDTO);
    //     }
        
    //     return tourImportantDTOList;
    // }
  // ✅ Get Tours by Country and  with Pagination
    public List<TourSearchDTO> getToursByCountry(String country, int offset, int size) {
        if (country == null || country.trim().isEmpty()) {
            throw new IllegalArgumentException("Country must not be null or empty");
        }
        System.out.println(country);
        System.out.println(offset);
        System.out.println(size);

        if (offset < 0) offset = 0;
        if (size <= 0) size = 10; // default page size

        
        List<TourSearchDTO> result = tourRepository.findToursByCountryWithPagination(country.trim(), offset, size);
        return result != null ? result : new ArrayList<>();
    }
}
