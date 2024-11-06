package com.aintopia.aingle.member.dto.response;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.MemberImageDto;
import com.aintopia.aingle.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailResponseDto {
    private List<Post> post;
    private Integer postCount;
    private Integer followCount;
}
