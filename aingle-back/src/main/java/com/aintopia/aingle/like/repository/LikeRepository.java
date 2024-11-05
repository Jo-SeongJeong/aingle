package com.aintopia.aingle.like.repository;

import com.aintopia.aingle.like.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByPost_PostIdAndMember_MemberId(Long postId, Long memberId);
}
