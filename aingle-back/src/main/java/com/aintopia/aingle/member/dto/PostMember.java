package com.aintopia.aingle.member.dto;

import com.aintopia.aingle.member.domain.MemberImage;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PostMember {
    private Long memberId;
    private String name;
    private String memberImage;
}
