package com.aintopia.aingle.post.controller;

import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.post.dto.Request.PostRegistRequestDto;
import com.aintopia.aingle.post.dto.Response.PostDetailResponseDto;
import com.aintopia.aingle.post.dto.Response.PostResponseDto;
import com.aintopia.aingle.post.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RequestMapping("/posts")
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @GetMapping
    @Operation(summary = "게시글 전체 조회", description = "게시글 전체 조회시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 전체 조회 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> findById() {
        Long memberId = MemberInfo.getId();
        List<PostResponseDto> postResponseDtoList = postService.getAllPost(memberId);

        return ResponseEntity.ok(postResponseDtoList);
    }

    @GetMapping("/details/{postId}")
    @Operation(summary = "게시글 상세 조회", description = "게시글 상세 조회시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 상세 조회 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> findById(@PathVariable Long postId) {

        PostDetailResponseDto postDetailResponseDto = postService.findById(postId);

        return ResponseEntity.ok(postDetailResponseDto);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "게시글 등록", description = "게시글 등록시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 등록 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> registPost(@RequestPart("postRegistRequestDto") PostRegistRequestDto postRegistRequestDto,
                                 @RequestPart(value = "file", required = false) MultipartFile file) throws IOException {
        Long memberId = MemberInfo.getId();

        postService.registPost(postRegistRequestDto, file, memberId);

        return ResponseEntity.status(HttpStatus.OK).body("게시글 등록 성공!");
    }

    @DeleteMapping("/{postId}")
    @Operation(summary = "게시글 삭제", description = "게시글 삭제시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 삭제 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> deleteById(@PathVariable Long postId) {
        Long memberId = MemberInfo.getId();

        postService.deleteById(postId, memberId);

        return ResponseEntity.status(HttpStatus.OK).body("게시글 삭제 성공!");
    }

}
