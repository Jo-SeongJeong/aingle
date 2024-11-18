package com.aintopia.aingle.character.dto.response;

import com.aintopia.aingle.character.domain.Character;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CharacterDetailResponse {
    private Long characterId;
    private String name;
    private String job;
    private int age;
    private String tone;    //반말, 존댓말
    private String talkType;    // 간결, 투머치토커
    private String personality; // 성격
    private String imageUrl;
    private String summary;

    @Builder
    public CharacterDetailResponse(Character character, String imageUrl) {
        this.characterId = character.getCharacterId();
        this.name = character.getName();
        this.job = character.getJob();
        this.age = character.getAge();
        this.tone = getToneAsString(character.getTone());
        this.talkType = getTalkTypeAsString(character.getTalkType());
        this.personality = character.getPersonality();
        this.imageUrl = imageUrl;
        this.summary = character.getSummary();
    }

    // 말투 변환하여 문자열로 반환
    private String getToneAsString(Boolean tone) {
        return (tone!= null &&tone) ? "존댓말" : "반말";
    }

    // talkType 변환하여 문자열로 반환
    private String getTalkTypeAsString(Boolean talkType) {
        return (talkType != null && talkType) ? "간결" : "투머치토커";
    }

}
