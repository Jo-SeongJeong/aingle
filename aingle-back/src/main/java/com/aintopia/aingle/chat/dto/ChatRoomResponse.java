package com.aintopia.aingle.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class ChatRoomResponse {
    private List<ChatRoomDto> chatRoomDtoList;
}
