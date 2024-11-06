package com.aintopia.aingle.member.domain;

import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.member.dto.request.MemberSignUpRequestDto;
import com.aintopia.aingle.member.dto.request.MemberUpdateRequestDto;
import com.aintopia.aingle.post.domain.Post;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "member")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @NotNull
    @Column(name = "email", length = 60, unique = true)
    private String email;

    @NotNull
    @Column(name = "name", length = 30, unique = true)
    private String name;

    @NotNull
    @Column(name = "birth")
    private LocalDate birth;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "platform")
    private Platform platform;

    @Column(name = "language")
    @Enumerated(EnumType.STRING)
    @ColumnDefault("korean")
    private Language language;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @Column(name = "resign_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime resignTime;

    @Column(name = "is_resigned")
    @ColumnDefault("false")
    private Boolean isResigned;

    @Column(name = "alarm_count")
    @ColumnDefault("0")
    private Integer alarmCount;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private MemberImage memberImage;

    public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {
        this.name = memberUpdateRequestDto.getName();
        this.birth = memberUpdateRequestDto.getBirth();
        this.language = memberUpdateRequestDto.getLanguage();
    }

    public void updateImage(MemberImage memberImage) {
        this.memberImage = memberImage;
    }

    public void resign() {
        this.isResigned = true;
        this.resignTime = LocalDateTime.now();
    }

    @Builder(builderMethodName = "signupBuilder")
    public Member(MemberSignUpRequestDto memberSignUpRequestDto) {
        this.name = memberSignUpRequestDto.getName();
        this.email = memberSignUpRequestDto.getEmail();
        this.birth = memberSignUpRequestDto.getBirth();
        this.platform = memberSignUpRequestDto.getPlatform();
        this.language = memberSignUpRequestDto.getLanguage();
    }

    public void saveImage(MemberImage meberImage) {
        this.memberImage = meberImage;
    }

    public PostMember changeDto() {
        return new PostMember(this.memberId, this.name, this.memberImage != null ? this.memberImage.getMemberImage() : null);
    }
}
