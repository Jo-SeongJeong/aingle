package com.aintopia.aingle.character.dto.response;

import lombok.Data;

@Data
public class CharacterSurveyResponseDto {
    private Long characterId;
    private String name;
    private String job;
    private Integer age;
    private Boolean tone;
    private String personality;
    private Boolean talkType;
    private String etc;
    private String imageUrl;
}
