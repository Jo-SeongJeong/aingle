package com.aintopia.aingle.member.dto;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.domain.MemberImage;
import com.aintopia.aingle.member.domain.Platform;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberDto {
    private Long memberId;
    private String email;
    private String name;
    private LocalDate birth;
    private Platform platform;
    private Language language;
    private LocalDate createTime;
    private LocalDate resignTime;
    private Boolean isResigned;
    private Integer alarmCount;

    private MemberImage memberImage;
}
