package com.aintopia.aingle.reply.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.reply.domain.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply>  findByComment(Comment comment);
    List<Reply> findByCharacter(Character character);
}
