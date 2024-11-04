package com.aintopia.aingle.member.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MemberImageDto {
    private Long memberId;
    private String memberImage;
}
