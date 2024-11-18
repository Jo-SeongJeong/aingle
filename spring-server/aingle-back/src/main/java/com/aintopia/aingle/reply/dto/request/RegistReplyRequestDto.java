package com.aintopia.aingle.reply.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegistReplyRequestDto {
    private Long commentId;
    private String content;
}
