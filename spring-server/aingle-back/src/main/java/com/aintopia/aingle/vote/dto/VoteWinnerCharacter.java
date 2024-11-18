package com.aintopia.aingle.vote.dto;

import com.aintopia.aingle.character.domain.Character;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class VoteWinnerCharacter {
    private Long characterId;
    private String name;
    private String imageUrl;

    public VoteWinnerCharacter(Character character) {
        this.characterId = character.getCharacterId();
        this.name = character.getName();
        this.imageUrl = character.getCharacterImage().getImageUrl();
    }
}
