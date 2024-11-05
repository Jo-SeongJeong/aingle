package com.aintopia.aingle.reply.repository;

import com.aintopia.aingle.reply.domain.Reply;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReplyRepository extends JpaRepository<Reply, Long> {
}
