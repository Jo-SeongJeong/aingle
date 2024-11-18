package com.aintopia.aingle.post.event;

import com.aintopia.aingle.common.dto.CreateAIPostResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateAIPostEvent {
    private CreateAIPostResponseDto createAIPostResponseDto;
    private Long characterId;
}
