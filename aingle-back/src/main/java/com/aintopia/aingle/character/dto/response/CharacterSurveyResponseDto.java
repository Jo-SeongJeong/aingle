package com.aintopia.aingle.character.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CharacterSurveyResponseDto {
    private Long characterId;
    private String name;
    private String job;
    private Integer age;
    private Boolean tone;
    private String personality;
    private Boolean talkType;
    private String etc;
}
