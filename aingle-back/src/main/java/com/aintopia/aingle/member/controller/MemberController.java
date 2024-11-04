package com.aintopia.aingle.member.controller;

import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.member.dto.MemberDto;
import com.aintopia.aingle.member.dto.request.MemberSignUpRequestDto;
import com.aintopia.aingle.member.dto.response.MemberDetailResponseDto;
import com.aintopia.aingle.member.service.MemberService;
import com.aintopia.aingle.security.util.JwtUtil;
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

@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtUtil jwtUtil;

    @PostMapping(value = "/sign-up", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "회원가입", description = "회원가입 할 때 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "회원가입에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<?> signUp(@RequestPart("memberSignUpRequestDto") MemberSignUpRequestDto memberSignUpRequestDto,
                                    @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        System.out.println(file);

        String accessToken = memberService.signUp(memberSignUpRequestDto, file);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

    @GetMapping
    @Operation(summary = "회원정보 조회", description = "회원정보 조회시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "회원정보 조회 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    public ResponseEntity<?> findById() {
        Long memberId = MemberInfo.getId();

        MemberDetailResponseDto memberDetailResponseDto = memberService.findById(memberId);

        return ResponseEntity.status(HttpStatus.OK).body(memberDetailResponseDto);
    }
}
