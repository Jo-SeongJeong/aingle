package com.aintopia.aingle.comment.dto;

import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.reply.dto.ReplyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentDto {
    private Long commentId;
    private String content;
    private LocalDateTime createTime;
    private PostMember member;
    private PostCharacter character;

    private List<ReplyDto> replies; // 대댓글 리스트
}
