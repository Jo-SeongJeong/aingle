package com.aintopia.aingle.global.openai.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PostRequest {
    String message;
    String imageUrl;
}