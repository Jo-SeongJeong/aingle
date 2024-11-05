package com.aintopia.aingle.comment.controller;

import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.comment.dto.Request.RegistCommentRequestDto;
import com.aintopia.aingle.comment.service.CommentService;
import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.like.dto.Request.DeleteLikeRequestDto;
import com.aintopia.aingle.like.dto.Request.RegistLikeRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/comments")
@RestController
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/{postId}")
    @Operation(summary = "게시글 상세조회(댓글/대댓글 조회)", description = "게시글 상세조회시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "게시글 상세 조회 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> findByPostId(@PathVariable("postId") Long postId) {
        List<CommentDto> commentDtoList = commentService.findByPostId(postId);

        return ResponseEntity.ok().body(commentDtoList);
    }

    @PostMapping
    @Operation(summary = "댓글 등록", description = "댓글 등록시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "댓글 등록 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> registComment(@RequestBody RegistCommentRequestDto registCommentRequestDto) {
        Long memberId = MemberInfo.getId();

        List<CommentDto> commentDtoList = commentService.registComment(registCommentRequestDto, memberId);

        return ResponseEntity.ok().body(commentDtoList);
    }

    @DeleteMapping("/{commentId}")
    @Operation(summary = "댓글 삭제", description = "댓글 삭제시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "댓글 삭제 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
        Long memberId = MemberInfo.getId();

        List<CommentDto> commentDtoList = commentService.deleteComment(commentId, memberId);

        return ResponseEntity.ok().body(commentDtoList);
    }
}
