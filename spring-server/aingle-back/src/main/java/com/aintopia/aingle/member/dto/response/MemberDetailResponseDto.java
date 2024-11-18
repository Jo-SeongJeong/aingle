package com.aintopia.aingle.member.dto.response;


import com.aintopia.aingle.post.dto.MyPagePostDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailResponseDto {
    private List<MyPagePostDto> post;
    private Integer postCount;
    private Integer followCount;
}
