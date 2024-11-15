package com.aintopia.aingle.chat.dto;

import com.aintopia.aingle.character.dto.ChatCharacter;
import com.aintopia.aingle.chat.domain.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class ChatMessageDto {
    private Long chatMessageId;
    private String message;
    private Long memberId;
    private ChatCharacter character;
    private LocalDateTime createTime;

    public ChatMessageDto(ChatMessage chatMessage) {
        this.chatMessageId = chatMessage.getChatMessageId();
        this.message = chatMessage.getContent();
        this.memberId = chatMessage.getMember() == null ? null : chatMessage.getMember().getMemberId();
        this.character = new ChatCharacter(chatMessage.getCharacter());
        this.createTime = chatMessage.getCreateTime();
    }
}
