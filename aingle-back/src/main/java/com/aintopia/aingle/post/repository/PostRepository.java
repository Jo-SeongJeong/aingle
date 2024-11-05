package com.aintopia.aingle.post.repository;

import com.aintopia.aingle.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("SELECT p FROM Post p WHERE p.member.memberId = :memberId")
    List<Post> findByMemberId(@Param("memberId") Long memberId);

    @Query("SELECT p FROM Post p WHERE p.character.characterId = :characterId")
    List<Post> findByCharacterId(@Param("characterId") Long characterId);
}
