package com.aintopia.aingle.comment.domain;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.comment.dto.Request.RegistCommentRequestDto;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.domain.Post;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "content", length = 600)
    private String content;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @Column(name = "delete_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime deleteTime;

    @Column(name = "is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "character_id")
    private Character character;

    @Builder(builderMethodName = "commentBuilder")
    public Comment(Post post, Member member, RegistCommentRequestDto registCommentRequestDto) {
        this.post = post;
        this.member = member;
        this.content = registCommentRequestDto.getContent();
        this.isDeleted = false;
        this.createTime = LocalDateTime.now();
    }

    public Comment(Post post, Character character, String content ) {
        this.post = post;
        this.character = character;
        this.content = content;
        this.isDeleted = false;
        this.createTime = LocalDateTime.now();
    }

    public static Comment makeCommentByAI(Post post, Character character, String content) {
        return new Comment(post, character, content);
    }

    public void delete() {
        this.isDeleted = true;
        this.deleteTime = LocalDateTime.now();
    }
}
