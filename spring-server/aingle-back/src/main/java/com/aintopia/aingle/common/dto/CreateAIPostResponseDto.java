package com.aintopia.aingle.common.dto;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Data
public class CreateAIPostResponseDto {
    private MultipartFile file;
    private String content;
}