package com.aintopia.aingle.member.dto.response;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.dto.MemberImageDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MemberDetailResponseDto {
    private String email;
    private String name;
    private LocalDate birth;
    private Language language;
    private MemberImageDto memberImageDto;
}
