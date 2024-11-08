package com.aintopia.aingle.post.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.domain.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface PostRepository extends JpaRepository<Post, Long> {
@Query("SELECT p FROM Post p WHERE (p.member = :member OR p.character IN :characters) AND p.isDeleted = false")
    Page<Post> findByMemberOrCharacterInAndIsDeletedFalse(
            @Param("member") Member member,
            @Param("characters") List<Character> characters,
            Pageable pageable
    );

    @Query("SELECT p FROM Post p WHERE p.member.memberId = :memberId AND p.isDeleted = false")
    List<Post> findByMemberId(@Param("memberId") Long memberId);

    List<Post> findByCharacter(Character character);
}
