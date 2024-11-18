package com.aintopia.aingle.character.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CharacterCreateResponseDto {
    private Long characterId;

    @Builder
    public CharacterCreateResponseDto(Long characterId) {
        this.characterId = characterId;
    }
}
