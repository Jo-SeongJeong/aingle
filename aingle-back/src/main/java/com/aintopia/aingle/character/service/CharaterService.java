package com.aintopia.aingle.character.service;

import com.aintopia.aingle.character.dto.request.CharacterSurveyRequestDto;
import com.aintopia.aingle.character.dto.response.CharacterSurveyResponseDto;
import com.aintopia.aingle.character.repository.CharacterImageRepository;
import com.aintopia.aingle.character.repository.CharacterRepository;
import java.util.NoSuchElementException;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharaterService {

    private final CharacterRepository characterRepository;
    private final CharacterImageRepository characterImageRepository;
    private final ModelMapper mapper;

    public CharacterSurveyResponseDto getCharacterSurvey(CharacterSurveyRequestDto requestDto) {
        int ei = requestDto.getEi(); // E: 0, I: 1
        int sn = requestDto.getSn(); // S: 0, N: 1
        int tf = requestDto.getTf(); // T: 0, F: 1
        int jp = requestDto.getJp(); // J: 0, P: 1

        int combination = (ei << 3) | (sn << 2) | (tf << 1) | jp;

        Long characterId = getCharacterIdByCombination(combination);

        return mapper.map(characterRepository.findById(characterId)
                .orElseThrow(
                    () -> new NoSuchElementException("Character not found with id: " + characterId)),
            CharacterSurveyResponseDto.class);
    }

    private Long getCharacterIdByCombination(int combination) {
        switch (combination) {
            case 0b0000: // 0
                return 2L; // ESTJ
            case 0b0001: // 1
                return 4L; // ESTP
            case 0b0010: // 2
                return 4L; // ESFJ
            case 0b0011: // 3
                return 1L; // ESFP
            case 0b0100: // 4
                return 2L; // ENTJ
            case 0b0101: // 5
                return 3L; // ENTP
            case 0b0110: // 6
                return 3L; // ENFJ
            case 0b0111: // 7
                return 1L; // ENFP
            case 0b1000: // 8
                return 2L; // ISTJ
            case 0b1001: // 9
                return 6L; // ISTP
            case 0b1010: // 10
                return 4L; // ISFJ
            case 0b1011: // 11
                return 1L; // ISFP
            case 0b1100: // 12
                return 6L; // INTJ
            case 0b1101: // 13
                return 3L; // INTP
            case 0b1110: // 14
                return 5L; // INFJ
            case 0b1111: // 15
                return 5L; // INFP
            default:
                throw new IllegalArgumentException("Invalid MBTI combination");
        }
    }
}
