package com.aintopia.aingle.common.diffusionai;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.http.HttpHeaders;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;

@Component
@Slf4j
public class DiffusionAIClient {

    @Value("${diffusionai.api.key}")
    private String apiKey; // API 키를 프로퍼티 파일에서 불러옵니다.

    @Value("${diffusionai.api.url}")
    private String apiUrl;

    public MultipartFile generateImage(String prompt) throws IOException {
        // RestTemplate 생성
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Accept", "image/*");

        // 멀티파트 요청 본문 구성
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("prompt", prompt);
        body.add("output_format", "jpeg");

        // 빈 파일을 첨부 (예: 빈 파일로 대체하는 부분, 실제 파일이 있다면 해당 파일을 첨부)
        body.add("none", new ByteArrayResource(new byte[0]));

        // HTTP 요청 본문 설정
        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(body, headers);

        // 이미지 요청 (파일 업로드 없이, image 데이터를 받는 방식)
        ResponseEntity<byte[]> response = restTemplate.exchange(apiUrl, HttpMethod.POST, entity, byte[].class);

        // 응답 상태 확인
        if (response.getStatusCode() == HttpStatus.OK) {
            // 응답 바이트 데이터를 MultipartFile로 반환
            return new MockMultipartFile("stable-image.png", "stable-image.png", "image/png", response.getBody());
        } else {
            // 오류 처리
            throw new RuntimeException("Failed to generate image: " + response.getStatusCode());
        }
    }
}
