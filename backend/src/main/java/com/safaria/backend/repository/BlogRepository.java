package com.safaria.backend.repository;

import com.safaria.backend.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Integer> {

    @Override
    List<Blog> findAll();

    @Override
    void deleteById(Integer aLong);

    @Override
    Optional<Blog> findById(Integer blog_id);

    List<Blog> findByUsername(String username);
}
