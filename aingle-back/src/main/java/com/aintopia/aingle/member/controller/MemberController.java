package com.aintopia.aingle.member.controller;

import com.aintopia.aingle.member.dto.request.MemberSignUpRequestDto;
import com.aintopia.aingle.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/members")
@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/sign-up")
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
    public ResponseEntity<?> signUp(@RequestPart("MemberSignUpRequestDto") MemberSignUpRequestDto memberSignUpRequestDto,
                                    @RequestPart("file") MultipartFile file) {
        memberSignUpRequestDto.setFile(file);
        String accessToken = memberService.signUp(memberSignUpRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(accessToken);
    }

}
