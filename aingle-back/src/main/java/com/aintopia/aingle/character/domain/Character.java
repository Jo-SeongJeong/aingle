package com.aintopia.aingle.character.domain;

import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.vote.domain.Vote;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "character")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Character {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "character_id")
    private Long characterId;

    @Column(name = "name", length = 30)
    private String name;

    @Column(name = "job", length = 30)
    private String job;

    @Column(name = "age")
    private Integer age;

    @Column(name = "tone")
    private Boolean tone;

    @Column(name = "personality", length = 30)
    private String personality;

    @Column(name = "talk_type")
    private Boolean talkType;

    @Column(name = "etc", length = 150)
    private String etc;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @Column(name = "delete_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime deleteTime;

    @Column(name = "is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(name = "vote_count")
    private Integer voteCount;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @Builder
    public Character(String name, String job, Integer age, Boolean tone, String personality,
        Boolean talkType, String etc, LocalDateTime createTime, LocalDateTime deleteTime,
        Boolean isDeleted, Member member, Integer voteCount, Vote vote) {
        this.name = name;
        this.job = job;
        this.age = age;
        this.tone = tone;
        this.personality = personality;
        this.talkType = talkType;
        this.etc = etc;
        this.createTime = createTime;
        this.deleteTime = deleteTime;
        this.isDeleted = isDeleted;
        this.member = member;
        this.voteCount = voteCount;
        this.vote = vote;
    }
}
