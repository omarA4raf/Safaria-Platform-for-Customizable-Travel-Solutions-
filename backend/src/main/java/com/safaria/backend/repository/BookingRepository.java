package com.safaria.backend.repository;

import com.safaria.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;
import com.safaria.backend.entity.Booking.BookingStatus;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByStatusAndBookingTimeBefore(BookingStatus status, LocalDateTime time);
}
