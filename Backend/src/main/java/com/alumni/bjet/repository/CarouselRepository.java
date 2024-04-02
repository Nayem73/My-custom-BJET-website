package com.alumni.bjet.repository;

import com.alumni.bjet.model.Carousel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarouselRepository extends JpaRepository<Carousel, Long> {
//    List<Carousel> findByCarouselId(Long carouselId);
}
