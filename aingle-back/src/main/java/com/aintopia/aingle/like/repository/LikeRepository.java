package com.aintopia.aingle.like.repository;

import com.aintopia.aingle.like.domain.Like;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface LikeRepository extends JpaRepository<Like, Long> {
    Optional<Like> findByPost_PostIdAndMember_MemberId(Long postId, Long memberId);
    Boolean existsByMemberAndPost(Member member, Post post);
}
