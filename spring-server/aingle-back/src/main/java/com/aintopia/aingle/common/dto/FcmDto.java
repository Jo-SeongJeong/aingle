package com.aintopia.aingle.common.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FcmDto {
    String fcmToken;
    String title;
    String message;
    Integer delayMinutes;
    Long postId;
    Long alarmId;
}
