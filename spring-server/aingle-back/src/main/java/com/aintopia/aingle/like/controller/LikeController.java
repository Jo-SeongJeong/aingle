package com.aintopia.aingle.like.controller;

import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.like.dto.Request.DeleteLikeRequestDto;
import com.aintopia.aingle.like.dto.Request.RegistLikeRequestDto;
import com.aintopia.aingle.like.service.LikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/likes")
@RestController
@RequiredArgsConstructor
public class LikeController {
    private final LikeService likeService;

    @PostMapping
    @Operation(summary = "좋아요 등록", description = "좋아요 등록시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "좋아요 등록 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> registLike(@RequestBody RegistLikeRequestDto registLikeRequestDto) {
        Long memberId = MemberInfo.getId();

        likeService.registLike(registLikeRequestDto, memberId);

        return ResponseEntity.ok().body("좋아요 등록 성공!");
    }

    @PatchMapping
    @Operation(summary = "좋아요 삭제", description = "좋아요 삭제시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "좋아요 삭제 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> deleteLike(@RequestBody DeleteLikeRequestDto deleteLikeRequestDto) {
        Long memberId = MemberInfo.getId();

        likeService.deleteLike(deleteLikeRequestDto, memberId);

        return ResponseEntity.ok().body("좋아요 삭제 성공!");
    }
}
