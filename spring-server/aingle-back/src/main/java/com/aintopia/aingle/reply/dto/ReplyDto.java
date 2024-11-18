package com.aintopia.aingle.reply.dto;

import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.member.dto.PostMember;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReplyDto {
    private Long replyId;
    private String content;
    private LocalDateTime createTime;
    private PostMember member;
    private PostCharacter character;
}
