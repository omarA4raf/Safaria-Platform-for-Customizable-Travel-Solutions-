package com.safaria.backend.repository;
import com.safaria.backend.entity.Blog;
import com.safaria.backend.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {


    @Override
    List<Blog> findAll();
    @Override
    void deleteById(Integer aLong);
}