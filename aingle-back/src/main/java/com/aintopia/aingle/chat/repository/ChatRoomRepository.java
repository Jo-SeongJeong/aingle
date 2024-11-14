package com.aintopia.aingle.chat.repository;

import com.aintopia.aingle.chat.domain.ChatRoom;
import com.aintopia.aingle.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    List<ChatRoom> findByMember(Member member);
}
