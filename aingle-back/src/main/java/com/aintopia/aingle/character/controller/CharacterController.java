package com.aintopia.aingle.character.controller;

import com.aintopia.aingle.character.dto.request.CharacterCreateRequest;
import com.aintopia.aingle.character.dto.request.CharacterSurveyRequestDto;
import com.aintopia.aingle.character.dto.response.AllCharacterResponse;
import com.aintopia.aingle.character.dto.response.CharacterCreateResponseDto;
import com.aintopia.aingle.character.dto.response.CharacterDetailResponse;
import com.aintopia.aingle.character.service.CharacterService;
import com.aintopia.aingle.common.util.MemberInfo;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequestMapping("/characters")
@RestController
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping("/survey")
    @Operation(summary = "초기 설문조사 결과에 따른 캐릭터 반환 값 API", description = " MBTI 기반"
        + "E: 0, I: 1"
        + "S: 0, N: 1"
        + "T: 0, F: 1"
        + "J: 0, P: 1")
    public ResponseEntity<?> survey(
        @RequestBody CharacterSurveyRequestDto characterSurveyRequestDto) {
        return ResponseEntity.status(HttpStatus.OK)
            .body(characterService.getCharacterSurvey(characterSurveyRequestDto));
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "캐릭터 리스트 조회", description = "public한 모든 AI 캐릭터 리스트 조회 API")
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
    public ResponseEntity<AllCharacterResponse> getAllCharacter() {
        Long memberId = MemberInfo.getId();
        AllCharacterResponse allCharacterResponse = characterService.getAllCharacter(memberId);
        return ResponseEntity.ok().body(allCharacterResponse);
    }

    @GetMapping(value = "/my-character", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "나만의 캐릭터 리스트 조회", description = "내가 만든 캐릭터 리스트 조회 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "나만의 캐릭터 리스트 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        ),
    })
    public ResponseEntity<AllCharacterResponse> getAllMyCharacter() {
        Long memberId = MemberInfo.getId();
        AllCharacterResponse allCharacterResponse = characterService.getAllMyCharacter(memberId);
        return ResponseEntity.ok().body(allCharacterResponse);
    }

    @GetMapping(value = "/{characterId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "캐릭터 특징 상세 조회", description = "AI 캐릭터 특징 상세 조회 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "캐릭터 특징 상세 조회에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        ),
    })
    public ResponseEntity<CharacterDetailResponse> getCharacterDetailById(
        @PathVariable Long characterId) {
        CharacterDetailResponse characterDetailResponse = characterService.getCharacterDetailById(
            characterId);
        return ResponseEntity.ok().body(characterDetailResponse);
    }

    @PostMapping(value = "")
    @Operation(summary = "나만의 캐릭터 생성", description = "나만의 AI 캐릭터 생성 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "캐릭터 생성에 성공하였습니다!",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        ),
    })
    public ResponseEntity<CharacterCreateResponseDto> createCharacter(
        @RequestPart("characterCreateRequest") CharacterCreateRequest characterCreateRequest,
        @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Long memberId = MemberInfo.getId();

        return ResponseEntity.ok()
            .body(characterService.createCharacter(memberId, characterCreateRequest, file));
    }


    @DeleteMapping(value = "/{characterId}")
    @Operation(summary = "나만의 캐릭터 삭제", description = "내가 만든 캐릭터 삭제하는 API")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "캐릭터 삭제에 성공하였습니다!"
        ),
        @ApiResponse(
            responseCode = "500",
            description = "Error Message 로 전달함",
            content = @Content(mediaType = "application/json")
        ),
    })
    public ResponseEntity<Void> deleteCharacter(@PathVariable Long characterId) {
        Long memberId = MemberInfo.getId();
        characterService.deleteCharacter(memberId, characterId);
        return ResponseEntity.ok().build();
    }

}
