package com.aintopia.aingle.alarm.dto.response;

import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.post.dto.AlarmPost;
import com.aintopia.aingle.vote.dto.VoteWinnerCharacter;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class AlarmResponseDto {
    private Long alarmId;
    private Boolean isRead;
    private AlarmPost post;
    private VoteWinnerCharacter voteWinnerCharacter;
    private LocalDateTime createTime;
    private PostCharacter sender;

}
