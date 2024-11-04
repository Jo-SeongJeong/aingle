package com.aintopia.aingle.character.controller;

import com.aintopia.aingle.character.dto.request.CharacterSurveyRequestDto;
import com.aintopia.aingle.character.service.CharaterService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/characters")
@RestController
@RequiredArgsConstructor
public class CharacterController {

    private final CharaterService charaterService;

    @PostMapping("/survey")
    @Operation(summary = "초기 설문조사 결과에 따른 캐릭터 반환 값 API", description = " MBTI 기반"
        + "E: 0, I: 1"
        + "S: 0, N: 1"
        + "T: 0, F: 1"
        + "J: 0, P: 1")
    public ResponseEntity<?> survey(
        @RequestBody CharacterSurveyRequestDto characterSurveyRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(charaterService.getCharacterSurvey(characterSurveyRequestDto));
    }

}
