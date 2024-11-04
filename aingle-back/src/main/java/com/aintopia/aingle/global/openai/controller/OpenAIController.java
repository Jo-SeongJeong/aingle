package com.aintopia.aingle.global.openai.controller;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.repository.CharaterRepository;
import com.aintopia.aingle.global.openai.OpenAIClient;
import com.aintopia.aingle.global.openai.model.PostRequest;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OpenAIController {

    private final OpenAIClient openAIClient;
    private final CharaterRepository charaterRepository;

    @Operation(
            summary = "AI 댓글 생성 테스트 API",
            description = "사용자 게시글(사진-S3주소, 글) 생성 후 실행, 캐릭터 유보은으로 댓글 생성 테스트")
    @PostMapping("/test/comment")
    public String testAIComment(@RequestBody PostRequest postRequest) throws IOException {
        Character character = charaterRepository.findById(1L).get();
        CharacterInfo characterInfo = character.toDTO();
        log.info("test ai : " + characterInfo);
        return openAIClient.createCommentByAI(postRequest, characterInfo);
    }
}
