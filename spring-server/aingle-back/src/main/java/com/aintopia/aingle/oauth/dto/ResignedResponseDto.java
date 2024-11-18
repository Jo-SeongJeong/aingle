package com.aintopia.aingle.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ResignedResponseDto {
    private int status;
    private String message;
    private LocalDateTime timestamp;
}
