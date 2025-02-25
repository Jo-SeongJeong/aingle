package com.aintopia.aingle.chat.repository;

import com.aintopia.aingle.chat.domain.ChatMessage;
import com.aintopia.aingle.chat.domain.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    Page<ChatMessage> findByChatRoom(ChatRoom chatRoom, Pageable pageable);
}
