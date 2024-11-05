package com.aintopia.aingle.member.dto.response;

import com.aintopia.aingle.member.domain.Language;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.MemberImageDto;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class MemberDetailResponseDto {
    private String email;
    private String name;
    private LocalDate birth;
    private Language language;
    private MemberImageDto memberImageDto;

    public void memberDetail(Member member) {
        this.name = member.getName();
        this.email = member.getEmail();
        this.birth = member.getBirth();
        this.language = member.getLanguage();

        if(member.getMemberImage() != null) {
            this.memberImageDto = new MemberImageDto(member.getMemberId(), member.getMemberImage().getMemberImage());
        }
    }
}
