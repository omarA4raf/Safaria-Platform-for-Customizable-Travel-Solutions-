package com.safaria.backend.repository;

import com.safaria.backend.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Integer> {

    @Query("SELECT m FROM Chat m WHERE "
            + "(m.sender_username = :username1 AND m.receiver_username = :username2) "
            + "OR (m.sender_username = :username2 AND m.receiver_username = :username1)"
            + "ORDER BY m.id ASC")
    List<Chat> findMessagesBetweenUsers(@Param("username1") String username1, @Param("username2") String username2);

    @Query("SELECT m FROM Chat m WHERE "
            + "(m.sender_username = :username OR m.receiver_username = :username) "
            + "ORDER BY m.id ASC")
    List<Chat> findMessagesByUsername(@Param("username") String username);

    @Override
    void deleteById(Integer aLong);
}
