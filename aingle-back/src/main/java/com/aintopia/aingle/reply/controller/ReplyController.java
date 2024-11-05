package com.aintopia.aingle.reply.controller;

import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.reply.dto.request.RegistReplyRequestDto;
import com.aintopia.aingle.reply.service.ReplyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/replies")
@RestController
@RequiredArgsConstructor
public class ReplyController {
    private final ReplyService replyService;

    @PostMapping
    @Operation(summary = "대댓글 등록", description = "대댓글 등록시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "대댓글 등록 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> registReply(@RequestBody RegistReplyRequestDto registReplyRequestDto) {
        Long memberId = MemberInfo.getId();

        List<CommentDto> commentDtoList = replyService.registReply(registReplyRequestDto, memberId);

        return ResponseEntity.ok().body(commentDtoList);
    }

    @DeleteMapping("/{replyId}")
    @Operation(summary = "대댓글 삭제", description = "대댓글 삭제시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "대댓글 삭제 성공",
                    content = @Content(mediaType = "application/json")
            )
    })
    ResponseEntity<?> deleteComment(@PathVariable("replyId") Long replyId) {
        Long memberId = MemberInfo.getId();

        List<CommentDto> commentDtoList = replyService.deleteReply(replyId, memberId);

        return ResponseEntity.ok().body(commentDtoList);
    }
}
