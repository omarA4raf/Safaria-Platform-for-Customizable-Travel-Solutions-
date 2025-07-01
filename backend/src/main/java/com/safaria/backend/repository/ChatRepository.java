package com.safaria.backend.repository;
import com.safaria.backend.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    // Add custom query methods if needed, for example:
    // Admin findByEmail(String email);
    @Query("SELECT m FROM Chat m WHERE " +
            "(m.tourist_id = :tourist_id AND m.tour_provider_id = :tour_provider_id) " +
            "ORDER BY m.id ASC")
    List<Chat> findMessagesBetweenUsers(@Param("tourist_id") Integer tourist_id, @Param("tour_provider_id") Integer tour_provider_id);
    @Override
    void deleteById(Integer aLong);
}