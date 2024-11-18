package com.aintopia.aingle.character.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CharacterDto {
    private Long characterId;
    private String name;
    private String job;
    private Integer age;
    private Boolean tone;
    private String personality;
    private Boolean talkType;
    private String etc;
    private LocalDateTime createTime;
    private LocalDateTime deleteTime;
    private Boolean isDeleted;
    private Long memberId;
    private Integer voteCount;
}