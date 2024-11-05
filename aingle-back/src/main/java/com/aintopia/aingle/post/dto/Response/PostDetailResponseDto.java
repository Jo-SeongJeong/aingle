package com.aintopia.aingle.post.dto.Response;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostDetailResponseDto {
    private Long PostId;
    private String content;
    private String image;
    private LocalDateTime createTime;
    private Long totalLike;
    private Long totalComment;
    private Member member;
    private Character character;

}
