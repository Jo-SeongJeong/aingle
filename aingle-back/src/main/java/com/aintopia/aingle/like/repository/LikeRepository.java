package com.aintopia.aingle.like.repository;

import com.aintopia.aingle.like.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;


public interface LikeRepository extends JpaRepository<Like, Long> {
}
