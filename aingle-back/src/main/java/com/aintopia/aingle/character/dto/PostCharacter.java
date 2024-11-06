package com.aintopia.aingle.character.dto;

import com.aintopia.aingle.character.domain.CharacterImage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostCharacter {
    private Long characterId;
    private String name;
    private String characterImage;
}
