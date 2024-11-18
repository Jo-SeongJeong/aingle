package com.aintopia.aingle.chat.dto;

import com.aintopia.aingle.character.dto.ChatCharacter;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
public class MakeChatResponse {
    private String aiMessage;
    private ChatCharacter character;
    private LocalDateTime createTime;

}
