package com.aintopia.aingle.reply.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.reply.domain.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface ReplyRepository extends JpaRepository<Reply, Long> {
    @Query("SELECT r FROM Reply r WHERE r.comment = :comment AND (r.member = :member OR r.receiver = :member)")
    List<Reply> findByCommentAndMember(@Param("comment") Comment comment, @Param("member") Member member);
    List<Reply> findByCharacter(Character character);
}
