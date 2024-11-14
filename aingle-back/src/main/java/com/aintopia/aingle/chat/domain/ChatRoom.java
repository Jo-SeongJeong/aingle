package com.aintopia.aingle.chat.domain;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "chat_room")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long chatRoomId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "character_id", nullable = false)
    private Character character;

    @Column(name = "last_message", length = 120)
    private String lastMessage;

    @Column(name = "last_chat_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime lastChatTime;

    @Builder
    public ChatRoom(Member member, Character character) {
        this.member = member;
        this.character = character;
        this.lastMessage = "";
        this.lastChatTime = LocalDateTime.now();
    }

    public void updateLastMessage(String lastMessage) {
        this.lastMessage = lastMessage;
        this.lastChatTime = LocalDateTime.now();
    }
}

