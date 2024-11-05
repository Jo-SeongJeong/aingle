package com.aintopia.aingle.character.controller;

import com.aintopia.aingle.character.dto.request.CharacterSurveyRequestDto;
import com.aintopia.aingle.character.dto.response.AllCharacterResponse;
import com.aintopia.aingle.character.service.CharaterService;
import com.aintopia.aingle.follow.dto.FollowListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "캐릭터 리스트 조회", description = "모든 AI 캐릭터 리스트 조회 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "캐릭터 리스트 조회에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<AllCharacterResponse> getAllCharacter(){
        AllCharacterResponse allCharacterResponse = charaterService.getAllCharacter();
        return ResponseEntity.ok().body(allCharacterResponse);
    }

}
