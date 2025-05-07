package com.safaria.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.safaria.backend.DTO.TourImportantDTO;
import com.safaria.backend.entity.Tour;

public interface TourRepository extends JpaRepository<Tour, Integer> {
    @Query(value = """
        SELECT 
            t.tourid AS tourID,
            t.title AS title,
            t.rating AS rating,
            tp.username AS tourProviderName
        FROM tour t
        JOIN tour_provider tp ON t.tour_providerid = tp.userid
        WHERE t.destination_country = :country
        ORDER BY t.rating DESC
        LIMIT :size OFFSET :offset
        """, nativeQuery = true)
     List<TourImportantDTO> findToursByCountryAndFiltersWithPagination(
        @Param("country") String country,
        @Param("offset") int offset,
        @Param("size") int size
    );
}
