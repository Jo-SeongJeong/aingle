package com.aintopia.aingle.comment.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query("SELECT c FROM Comment c WHERE c.post = :post AND (c.member IS NULL OR c.member = :member)")
    List<Comment>  findByPostAndMemberIsNullOrMember(@Param("post") Post post, @Param("member") Member member);
    List<Comment> findByCharacter(Character character);
}
