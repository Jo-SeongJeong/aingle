package com.aintopia.aingle.chat.dto;

import com.aintopia.aingle.character.dto.ChatCharacter;
import com.aintopia.aingle.chat.domain.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ChatRoomDto {
    private Long chatRoomId;
    private String lastMessage;
    private LocalDateTime lastMessageTime;
    private ChatCharacter character;

    @Builder
    public ChatRoomDto(ChatRoom chatRoom) {
        this.chatRoomId = chatRoom.getChatRoomId();
        this.lastMessage = chatRoom.getLastMessage();
        this.lastMessageTime = chatRoom.getLastChatTime();
        this.character = new ChatCharacter(chatRoom.getCharacter());
    }
}
