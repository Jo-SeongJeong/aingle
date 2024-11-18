package com.aintopia.aingle.member.dto.request;

import com.aintopia.aingle.member.domain.Language;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberUpdateRequestDto {
    private String name;
    private LocalDate birth;
    private Language language;
}
