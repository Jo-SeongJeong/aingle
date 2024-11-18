package com.aintopia.aingle.alarm.domain;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.vote.domain.Vote;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "alarm")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id")
    private Long alarmId;

    @Column(name = "is_read")
    @ColumnDefault("false")
    private Boolean isRead;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sender_id")
    private Character sender;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @Builder(builderMethodName = "alarmPostBuilder")
    public Alarm(Post post, Member member, Character sender) {
        this.post = post;
        this.member = member;
        this.sender = sender;
    }

    public Alarm(Vote vote, Member member){
        this.vote = vote;
        this.member = member;
    }

    public static Alarm createVoteAlarm(Vote vote, Member member){
        return new Alarm(vote, member);
    }


    public void isRead() {
        this.isRead = true;
    }
}
