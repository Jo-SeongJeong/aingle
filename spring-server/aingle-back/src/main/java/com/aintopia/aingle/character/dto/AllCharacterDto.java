package com.aintopia.aingle.character.dto;

import com.aintopia.aingle.character.domain.Character;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class AllCharacterDto {
    private Long characterId;
    private String imageUrl;
    private boolean isFollow;

    @Builder
    public AllCharacterDto(Character character, String imageUrl, boolean isFollow) {
        this.characterId = character.getCharacterId();
        this.imageUrl = imageUrl;
        this.isFollow = isFollow;
    }
}
