package com.aintopia.aingle.member.dto.response;


import com.aintopia.aingle.post.domain.Post;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailResponseDto {
    private List<Post> post;
    private Integer postCount;
    private Integer followCount;
}
