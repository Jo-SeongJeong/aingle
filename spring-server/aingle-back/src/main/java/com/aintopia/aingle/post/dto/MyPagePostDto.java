package com.aintopia.aingle.post.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class MyPagePostDto {
    private Long postId;
    private String image;
}
