package com.aintopia.aingle.member.dto.request;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.domain.Platform;
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

    private Long characterId;
}
