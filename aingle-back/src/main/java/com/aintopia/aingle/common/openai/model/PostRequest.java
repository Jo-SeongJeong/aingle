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

    @Builder
    public PostRequest(String message, String imageUrl) {
        this.message = message;
        this.imageUrl = imageUrl;
    }
}