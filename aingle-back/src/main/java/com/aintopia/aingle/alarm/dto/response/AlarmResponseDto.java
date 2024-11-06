package com.aintopia.aingle.alarm.dto.response;

import com.aintopia.aingle.post.dto.AlarmPost;
import com.aintopia.aingle.vote.domain.Vote;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AlarmResponseDto {
    private Long alarmId;
    private Boolean isRead;
    private AlarmPost post;
    private Vote vote;

}
