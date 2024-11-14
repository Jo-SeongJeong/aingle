package com.aintopia.aingle.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ChatResponse {
    private Long chatRoomId;
    private List<ChatMessageDto> chatMessageList;
}
