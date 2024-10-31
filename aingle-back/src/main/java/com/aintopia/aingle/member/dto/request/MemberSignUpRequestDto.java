package com.aintopia.aingle.member.dto.request;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.domain.Platform;
import com.aintopia.aingle.member.dto.MemberImageDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class MemberSignUpRequestDto {
    private String name;
    private String email;
    private LocalDate birth;
    private Platform platform;
    private Language language;
    private MemberImageDto memberImage;
}
