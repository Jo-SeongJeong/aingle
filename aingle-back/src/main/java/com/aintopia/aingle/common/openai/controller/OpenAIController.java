package com.aintopia.aingle.common.openai.controller;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.common.dto.DummyRequestDto;
import com.aintopia.aingle.common.openai.OpenAIClient;
import com.aintopia.aingle.common.openai.model.PostRequest;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OpenAIController {

    private final OpenAIClient openAIClient;
    private final CharacterRepository characterRepository;

    @Operation(
            summary = "AI 댓글 생성 테스트 API",
            description = "사용자 게시글(사진-S3주소, 글) 생성 후 실행, 캐릭터 유보은으로 댓글 생성 테스트")
    @PostMapping("/test/comment")
    public String testAIComment(@RequestBody PostRequest postRequest) throws IOException {
        Character character = characterRepository.findById(1L).get();
        CharacterInfo characterInfo = character.toDTO();
        log.info("test ai : " + characterInfo);
        return openAIClient.createCommentByAI(postRequest, characterInfo);
    }

    @Operation(
        summary = "AI 댓글 생성 더미데이터에 넣을 API",
        description = "사용자 게시글(사진-S3주소, 글) 생성 후 실행, 캐릭터 유보은으로 댓글 생성 테스트")
    @PostMapping("/test/comment/do")
    public ResponseEntity<?> AIComment(@RequestBody DummyRequestDto dummyRequestDto) throws IOException {
        openAIClient.dummy(dummyRequestDto.getId());
        return ResponseEntity.ok(200);
    }

    @Operation(
        summary = "AI 게시글 생성 테스트 API2",
        description = "캐릭터 유보은으로 게시글 생성 테스트2")
    @GetMapping("/test/post2")
    public String testAIPost02() throws IOException {
        return openAIClient.createImageUrl(new CharacterInfo(
            "유보은",                         // 이름
            "대학생",                       // 직업
            25,                            // 나이
            "활발하고 긍정적인",              // 성격
            false,                         // 성별 (여자)
            false,                         // 말투 (반말)
            true,                          // 대화 스타일 (간결)
            Arrays.asList("친근한 대화 스타일", "맛집에 관심 많음", "재밌는 표현 사용") // 수정된 설명 리스트
        )).getContent();
    }
}
