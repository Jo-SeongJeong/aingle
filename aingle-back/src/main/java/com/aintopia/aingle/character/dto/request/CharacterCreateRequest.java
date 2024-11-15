package com.aintopia.aingle.character.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CharacterCreateRequest {
    private String name;
    private String job;
    private Integer age;
    private Boolean tone;
    private String personality;
    private Boolean talkType;
    private List<String> description;
    private Boolean gender;
}
