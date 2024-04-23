package com.alumni.bjet.repository;

import com.alumni.bjet.model.SuperAdminResource;
import com.alumni.bjet.model.UserReview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SuperAdminResourceRepository extends JpaRepository<SuperAdminResource, Long> {
    Page<SuperAdminResource> findAll(Pageable pageable);
}
