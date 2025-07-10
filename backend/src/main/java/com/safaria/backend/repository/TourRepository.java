package com.safaria.backend.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.safaria.backend.DTO.TourSearchDTO;
import com.safaria.backend.entity.Tour;

public interface TourRepository extends JpaRepository<Tour, Integer> {

    @Query(value = """
            SELECT 
                t.tourid AS tourID,
                t.title AS title,
                t.rating AS rating,
                tp.username AS tourProviderName,
                t.destination_country AS destinationCountry,
                MIN(ts.price) AS "priceAmount",
                t.currency AS "priceCurrency"
            FROM tour t
            JOIN tour_provider tp ON t.tour_providerid = tp.userid
            JOIN tour_schedule ts ON ts.tourid = t.tourid
            WHERE LOWER(t.destination_country) = LOWER(:country)
            GROUP BY t.tourid
            ORDER BY t.rating DESC , t.tourid ASC
            LIMIT :limit OFFSET :offset
            """, nativeQuery = true)
    List<TourSearchDTO> findToursByCountryWithPagination(
            @Param("country") String country,
            @Param("offset") int offset,
            @Param("limit") int limit
    );
}
