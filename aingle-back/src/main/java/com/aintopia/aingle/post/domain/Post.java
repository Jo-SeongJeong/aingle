package com.aintopia.aingle.post.domain;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.dto.AlarmPost;
import com.aintopia.aingle.post.dto.MyPagePostDto;
import com.aintopia.aingle.post.dto.Request.RegistPostRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Table(name = "post")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long postId;

    @NotNull
    @Column(name = "content", length = 900)
    private String content;

    @NotNull
    @Column(name = "image")
    private String image;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @Column(name = "delete_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime deleteTime;

    @Column(name = "is_deleted")
    @ColumnDefault("false")
    private Boolean isDeleted;

    @Column(name = "total_like")
    @ColumnDefault("0")
    private Long totalLike;

    @Column(name = "total_comment")
    @ColumnDefault("0")
    private Long totalComment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "character_id")
    private Character character;

    // 기존 빌더 메서드 유지
    @Builder(builderMethodName = "registBuilder")
    public Post(RegistPostRequestDto registPostRequestDto, String url, Member member) {
        this.content = registPostRequestDto.getContent();
        this.member = member;
        this.image = url;
        this.totalLike = 0L;
        this.totalComment = 0L;
        this.isDeleted = false;
        this.createTime = LocalDateTime.now();
    }

    // AI 게시글 생성용 스태틱 팩토리 메서드
    public static Post createPostForAI(RegistPostRequestDto registPostRequestDto, String url, Character character) {
        Post post = new Post();
        post.content = registPostRequestDto.getContent();
        post.character = character;
        post.image = url;
        post.totalLike = 0L;
        post.totalComment = 0L;
        post.isDeleted = false;
        post.createTime = LocalDateTime.now();
        return post;
    }

    // 삭제 메서드
    public void delete() {
        this.isDeleted = true;
        this.deleteTime = LocalDateTime.now();
    }

    public void increaseLike() {
        this.totalLike++;
    }

    public void decreaseLike() {
        this.totalLike--;
    }

    public void increaseComment() {
        this.totalComment++;
    }

    public void decreaseComment() {
        this.totalComment--;
    }

    public AlarmPost changeDto() {
        return new AlarmPost(this.postId, this.image);
    }

    public MyPagePostDto changeToMyPagePostDto() {
        return new MyPagePostDto(this.postId, this.image);
    }
}
