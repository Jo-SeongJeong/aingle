package com.aintopia.aingle.character.dto;

import com.aintopia.aingle.character.domain.Character;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class CharacterInfo {

    private String name;
    private String job;
    private int age;
    private String personality;
    private Boolean gender; // 0이면 여자, 1이면 남자
    private Boolean tone;   // 0이면 반말, 1이면 존댓말
    private Boolean talkType; // 0이면 투머치토커, 1이면 간결
    private List<String> description;


    // 성별 변환하여 문자열로 반환
    public String getGenderAsString() {
        return (gender != null && gender) ? "남자" : "여자";
    }

    // 말투 변환하여 문자열로 반환
    public String getToneAsString() {
        return (tone != null && tone) ? "존댓말" : "반말";
    }

    // talkType 변환하여 문자열로 반환
    public String getTalkTypeAsString() {
        return (talkType != null && talkType) ? "간결하게 한 문장" : "말이 많게 2~3문장";
    }

    @Override
    public String toString() {
        return "CharacterInfo{" +
                "name='" + name + '\'' +
                ", job='" + job + '\'' +
                ", age=" + age +
                ", personality='" + personality + '\'' +
                ", gender=" + gender +
                ", tone=" + tone +
                ", talkType=" + talkType +
                ", description=" + description +
                '}';
    }

    @Builder
    public CharacterInfo(Character character){
        this.name = character.getName();
        this.job = character.getJob();
        this.age = character.getAge();
        this.personality = character.getPersonality();
        this.gender = character.getGender();
        this.tone = character.getTone();
        this.talkType = character.getTalkType();
        this.description = character.getDescription();
    }
}
