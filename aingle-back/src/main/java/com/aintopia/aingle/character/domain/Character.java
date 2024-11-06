package com.aintopia.aingle.character.domain;

import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.character.dto.request.CharacterCreateRequest;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.vote.domain.Vote;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "character")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

    @Column(name = "gender") // 0이면 여자, 1이면 남자
    private Boolean gender;

    @Column(name = "tone") // 0이면 반말, 1이면 존댓말
    private Boolean tone;

    @Column(name = "personality", length = 30)
    private String personality;

    @Column(name = "talk_type")
    private Boolean talkType; // 0이면 투머치토커, 1이면 간결

    @Column(name = "description", columnDefinition = "TEXT[]")
    private List<String> description;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "delete_time")
    private LocalDateTime deleteTime;

    @Column(name = "is_deleted", nullable = false)
    private Boolean isDeleted = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "vote_count")
    private Integer voteCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    @Column(name = "summary")
    private String summary;

    @OneToOne(mappedBy = "character", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private CharacterImage characterImage;

    @Column(name = "is_public")
    private Boolean isPublic;

    public CharacterInfo toDTO() {
        return new CharacterInfo(this.name, this.job, this.age, this.personality, this.gender,
            this.tone, this.talkType, this.description);
    }

    public PostCharacter changeDto() {
        return new PostCharacter(this.characterId, this.name, this.characterImage != null ? this.characterImage.getImageUrl() : null);
    }

    @Builder
    public Character(CharacterCreateRequest characterCreateRequest, Member member){
        this.name = characterCreateRequest.getName();
        this.job = characterCreateRequest.getJob();
        this.age = characterCreateRequest.getAge();
        this.personality = characterCreateRequest.getPersonality();
        this.tone = characterCreateRequest.getTone();
        this.talkType = characterCreateRequest.getTalkType();
        this.description = characterCreateRequest.getDescription();
        this.createTime = LocalDateTime.now();
        this.member = member;
        this.gender = characterCreateRequest.getGender();
        this.isPublic = false;
    }

    public void deleteSoftly(Character character){
        this.isDeleted = true;
        this.deleteTime = LocalDateTime.now();
    }

    @Override
    public String toString() {
        return "Character{" +
                "characterId=" + characterId +
                ", name='" + name + '\'' +
                ", voteCount=" + voteCount +
                ", vote=" + vote +
                ", characterImage=" + characterImage +
                ", isPublic=" + isPublic +
                '}';
    }

    public void plusVoteCount(){
        this.voteCount++;
    }

    public void registerVote(Vote vote){
        this.vote = vote;
        this.voteCount = 0;
    }
}