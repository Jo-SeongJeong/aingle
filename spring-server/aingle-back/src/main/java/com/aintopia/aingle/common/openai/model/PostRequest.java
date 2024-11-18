package com.aintopia.aingle.common.openai.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class PostRequest {
    String message;
    String imageUrl;
    Long postId;

    @Builder
    public PostRequest(String message, String imageUrl, Long postId) {
        this.message = message;
        this.imageUrl = imageUrl;
        this.postId = postId;
    }
}