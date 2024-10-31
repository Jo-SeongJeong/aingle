package com.aintopia.aingle.member.dto.request;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.dto.MemberImageDto;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberUpdateRequestDto {
    private String name;
    private LocalDate birth;
    private Language language;
    private MemberImageDto memberImage;
}
