package com.safaria.backend.repository;

import com.safaria.backend.entity.BlogReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogReviewRepository extends JpaRepository<BlogReview, Integer> {

    List<BlogReview> findByBlogId(Integer blog_id);

    @Override
    void deleteById(Integer aLong);
}
