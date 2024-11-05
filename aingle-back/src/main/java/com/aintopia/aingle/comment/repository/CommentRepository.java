package com.aintopia.aingle.comment.repository;

import com.aintopia.aingle.comment.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CommentRepository extends JpaRepository<Comment, Long> {
}
