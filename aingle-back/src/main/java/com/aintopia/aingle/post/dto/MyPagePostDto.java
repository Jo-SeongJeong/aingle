package com.aintopia.aingle.post.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyPagePostDto {
    private Long postId;
    private String image;
}
