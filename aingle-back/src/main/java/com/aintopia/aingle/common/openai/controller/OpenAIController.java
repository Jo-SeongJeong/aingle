package com.aintopia.aingle.common.openai.controller;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.common.diffusionai.DiffusionAIClient;
import com.aintopia.aingle.common.dto.DummyRequestDto;
import com.aintopia.aingle.common.openai.OpenAIClient;
import com.aintopia.aingle.common.openai.model.PostRequest;
import com.aintopia.aingle.common.service.S3Service;
import io.swagger.v3.oas.annotations.Operation;
import java.util.Arrays;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OpenAIController {

    private final OpenAIClient openAIClient;
    private final CharacterRepository characterRepository;
    private final S3Service s3Service;
    private final DiffusionAIClient diffusionAIClient;

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

        MultipartFile file = openAIClient.createImageUrl(new CharacterInfo(
                "유보은",                         // 이름
                "대학생",                       // 직업
                25,                            // 나이
                "활발하고 긍정적인",              // 성격
                false,                         // 성별 (여자)
                false,                         // 말투 (반말)
                true,                          // 대화 스타일 (간결)
                Arrays.asList("친근한 대화 스타일", "맛집에 관심 많음", "재밌는 표현 사용") // 수정된 설명 리스트
        )).getFile();
        return s3Service.uploadFile(file);

    }

//    @Operation(
//            summary = "stable diffusion AI Image Generation\n",
//            description = "")
//    @GetMapping("/test/image")
//    public String testImage() throws IOException {
//
////        ImageResponse response = stabilityAiImageModel.call(
////                new ImagePrompt("Inside the quiet Korean restaurant,a Korean man sits at a table with a large pot of seafood soup in front of him and casually raises his spoon to eat the soup. He is a 28years old and has short sports hair and a neat side hair line, and the face is distinct and slightly dark. The background is a restaurant with a clean atmosphere with wooden tables and chairs, and you can see the darkened evening scenery outside the window. He is wearing a neat shirt, a slightly expressionless face."
////                        ,StabilityAiImageOptions.builder()
////                                .withN(1)
////                                .withCfgScale(Float.valueOf(7))
////                                .withHeight(1024)
////                                .withWidth(1024).build())
////
////        );
////        log.info("stable diffusion AI Image Generation ");
////        MultipartFile multipartFile = convertBase64ToMultipartFile(response.getResult().getOutput().getB64Json(), "stableimage.png");
////        return s3Service.uploadFile(multipartFile);
//        String prompt = "In front of a small restaurant in an alley on a lively street, a young korean woman with long, wavy brown hair is smiling with a drink with crispy croffles on her hands. The background is the exterior of the store decorated with yellow signs and bright flower decorations, and the surroundings are crowded with people and the atmosphere seems to smell like food. She is wearing a bright yellow knitwear and matching jeans, slightly tilting her head and looking at the camera.";
//        return diffusionAIClient.generateImage(prompt);
//    }

    public MultipartFile convertBase64ToMultipartFile(String base64Data, String fileName) {
        try {
            // Base64 문자열에서 헤더 제거 (e.g., "data:image/png;base64," 부분 제거)
            String[] parts = base64Data.split(",");
            String base64Image = parts.length > 1 ? parts[1] : parts[0];

            // Base64 디코딩
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);

            // MultipartFile 생성
            return new MockMultipartFile(
                    fileName, // 파일 이름
                    fileName, // 원본 파일 이름
                    "image/png", // MIME 타입 (필요에 따라 변경)
                    imageBytes // 파일 내용
            );
        } catch (Exception e) {
            throw new RuntimeException("Failed to convert Base64 to MultipartFile", e);
        }
    }
}
