package com.aintopia.aingle.character.dto;

import com.aintopia.aingle.character.domain.Character;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ChatCharacter {
    private Long characterId;
    private String name;
    private String characterImage;

    public ChatCharacter(Character character){
        this.characterId = character.getCharacterId();
        this.name = character.getName();
        this.characterImage = character.getCharacterImage().getImageUrl();
    }
}
