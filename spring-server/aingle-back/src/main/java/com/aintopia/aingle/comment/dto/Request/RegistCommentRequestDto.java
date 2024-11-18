package com.aintopia.aingle.comment.dto.Request;

import lombok.Data;

@Data
public class RegistCommentRequestDto {
    private Long postId;
    private String content;
}
