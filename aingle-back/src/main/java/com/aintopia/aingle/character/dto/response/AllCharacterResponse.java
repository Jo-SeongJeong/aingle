package com.aintopia.aingle.character.dto.response;

import com.aintopia.aingle.character.dto.CharacterImageDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AllCharacterResponse {
    List<CharacterImageDto> characterImages;
}
