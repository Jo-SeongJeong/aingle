package com.aintopia.aingle.post.domain;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.post.dto.AlarmPost;
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

    @Builder(builderMethodName = "registBuilder")
    public Post(RegistPostRequestDto registPostRequestDto, String url, Member member) {
        this.content = registPostRequestDto.getContent();
        this.member = member;
        this.image = url;
    }
    
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
}
