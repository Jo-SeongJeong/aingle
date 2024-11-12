package com.aintopia.aingle.reply.domain;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.reply.dto.request.RegistReplyRequestDto;
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
@Table(name = "reply")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reply_id")
    private Long replyId;

    @Column(name = "content", length = 600)
    private String content;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @Column(name = "delete_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime deleteTime;

    @Column(name = "is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "character_id")
    private Character character;

    @Builder(builderMethodName = "replyBuilder")
    public Reply(Comment comment, Member member, RegistReplyRequestDto registReplyRequestDto) {
        this.comment = comment;
        this.member = member;
        this.content = registReplyRequestDto.getContent();
        this.isDeleted = false;
    }

    public static Reply makeCharacterReply(Comment comment, Character character, RegistReplyRequestDto registReplyRequestDto){
        return new Reply(comment, character, registReplyRequestDto);
    }

    public Reply (Comment comment, Character character, RegistReplyRequestDto registReplyRequestDto){
        this.comment = comment;
        this.character = character;
        this.content = registReplyRequestDto.getContent();
        this.isDeleted = false;
        this.createTime = LocalDateTime.now();
    }

    public void delete() {
        this.isDeleted = true;
        this.deleteTime = LocalDateTime.now();
    }
}
