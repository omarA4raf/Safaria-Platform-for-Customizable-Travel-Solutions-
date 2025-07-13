package com.safaria.backend.repository;

import com.safaria.backend.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

    @Override
    List<Report> findAll();

    @Override
    void deleteById(Integer aLong);
}
