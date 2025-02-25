package com.aintopia.aingle.oauth.controller;

import com.aintopia.aingle.oauth.dto.AlreadySignUpResponseDto;
import com.aintopia.aingle.oauth.dto.GoogleMemberResponseDto;
import com.aintopia.aingle.oauth.dto.KakaoMemberResponseDto;
import com.aintopia.aingle.oauth.dto.ResignedResponseDto;
import com.aintopia.aingle.oauth.exception.AlreadySignUpException;
import com.aintopia.aingle.oauth.exception.ResignedException;
import com.aintopia.aingle.oauth.service.GoogleService;
import com.aintopia.aingle.oauth.service.KakaoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/oauth")
@RestController
@RequiredArgsConstructor
public class OAuthController {

    private final KakaoService kakaoService;
    private final GoogleService googleService;
    private final ObjectMapper objectMapper;

    @Operation(
        summary = "카카오 회원가입 요청",
        description = "카카오 회원가입 할 때 사용하는 API, 인가 코드를 넘겨줘야함")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "code와 email이 담긴 객체를 넘겨줌, 프론트는 이제 기존 서비스 회원가입을 진행해야함",
            content = @Content(mediaType = "application/json")
        ),
        @ApiResponse(
            responseCode = "303",
            description = "이미 가입되어 있는 회원임. Access Token을 넘겨주니 이를 저장하고 메인페이지로 이동해야함",
            content = @Content(mediaType = "application/json")
        )
    })
    @PostMapping("/kakao/{code}")
    public ResponseEntity<?> kakaoSignUp(@PathVariable("code") String code) {

        KakaoMemberResponseDto kakaoMemberResponseDto = kakaoService.getKakaoUser(code);
        return ResponseEntity.status(HttpStatus.OK).body(kakaoMemberResponseDto);
    }

    @Operation(
            summary = "구글 회원가입 요청",
            description = "구글 회원가입 할 때 사용하는 API, 인가 코드를 넘겨줘야함")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "email이 담긴 객체를 넘겨줌, 프론트는 이제 기존 서비스 회원가입을 진행해야함",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "303",
                    description = "이미 가입되어 있는 회원임. Access Token을 넘겨주니 이를 저장하고 메인페이지로 이동해야함",
                    content = @Content(mediaType = "application/json")
            )
    })
    @PostMapping("/google/{accessToken}")
    public ResponseEntity<?> googleSignUp(@PathVariable("accessToken") String accessToken) {
        GoogleMemberResponseDto googleMemberResponseDto = googleService.getGoogleUser(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(googleMemberResponseDto);
    }

    @ExceptionHandler(AlreadySignUpException.class)
    public ResponseEntity<?> alreadySignUp(AlreadySignUpException e)
        throws JsonProcessingException {
        AlreadySignUpResponseDto alreadySignUpResponseDto = new AlreadySignUpResponseDto(
            303,
            "이미 소셜회원가입이 된 아이디 입니다.",
            e.getMessage(),
            LocalDateTime.now()
        );

        String responseBody = objectMapper.writeValueAsString(alreadySignUpResponseDto);
        return ResponseEntity.status(303)
            .contentType(MediaType.APPLICATION_JSON)
            .body(responseBody);
    }

    @ExceptionHandler(ResignedException.class)
    public ResponseEntity<?> resigned()
            throws JsonProcessingException {
        ResignedResponseDto resignedResponseDto = new ResignedResponseDto(
                303,
                "이미 탈퇴한 회원입니다.",
                LocalDateTime.now()
        );

        String responseBody = objectMapper.writeValueAsString(resignedResponseDto);
        return ResponseEntity.status(303)
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseBody);
    }
}
