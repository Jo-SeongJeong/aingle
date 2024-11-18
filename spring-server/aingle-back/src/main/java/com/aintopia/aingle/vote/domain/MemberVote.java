package com.aintopia.aingle.vote.domain;

import com.aintopia.aingle.member.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "member_vote")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberVote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id", nullable = false)
    private Vote vote;

    @Column(name = "vote_time")
    private LocalDateTime voteTime; // 멤버가 투표한 시각

    @Builder
    public MemberVote(Member member, Vote vote) {
        this.member = member;
        this.vote = vote;
        this.voteTime = LocalDateTime.now();
    }

    public void updateVoteTime(){
        this.voteTime = LocalDateTime.now();
    }
}
