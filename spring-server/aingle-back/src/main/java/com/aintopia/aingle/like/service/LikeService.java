package com.aintopia.aingle.like.service;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.follow.repository.FollowRepository;
import com.aintopia.aingle.like.domain.Like;
import com.aintopia.aingle.like.dto.Request.DeleteLikeRequestDto;
import com.aintopia.aingle.like.dto.Request.RegistLikeRequestDto;
import com.aintopia.aingle.like.exception.AlreadyLikedException;
import com.aintopia.aingle.like.exception.ForbiddenLikeException;
import com.aintopia.aingle.like.exception.NotLikedException;
import com.aintopia.aingle.like.repository.LikeRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.exception.NotFoundPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final CharacterRepository characterRepository;

    @Transactional
    public void registLike(RegistLikeRequestDto registLikeRequestDto, Long memberId) {
        Post post = postRepository.findById(registLikeRequestDto.getPostId()).orElseThrow(NotFoundPostException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);

        Optional<Like> like = likeRepository.findByPostAndMember(post, member);

        if(like.isPresent()) throw new AlreadyLikedException();

        if(post.getIsDeleted()) throw new ForbiddenLikeException();

        post.increaseLike();
        postRepository.save(post);

        likeRepository.save(Like.likeBuilder()
                .post(post)
                .member(member)
                .build());
    }

    @Transactional
    public void deleteLike(DeleteLikeRequestDto deleteLikeRequestDto, Long memberId) {
        Post post = postRepository.findById(deleteLikeRequestDto.getPostId()).orElseThrow(NotFoundPostException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);

        Optional<Like> like = likeRepository.findByPostAndMember(post, member);

        if(like.isEmpty()) throw new NotLikedException();

        if(post.getIsDeleted()) throw new ForbiddenLikeException();

        post.decreaseLike();

        postRepository.save(post);

        likeRepository.deleteById(like.get().getLikeId());
    }

    @Async
    @Transactional
    public void scheduleLikeIncrease(Post post) {
        log.info("좋아요 대기");
//        long delay = 3600000L;  //1시간
        long delay = 60000L;  //1분

        List<Character> characters;
        if(post.getMember() != null){
            // 게시글 작성자의 팔로우 리스트 조회
            characters =  followRepository.findByMemberAndCharacterIsDeletedFalse(post.getMember())
                    .stream()
                    .map(Follow::getCharacter)
                    .collect(Collectors.toList());
        }else{
            // AI 게시글이면 공개된 모든 캐릭터
            characters = characterRepository.findByIsPublicTrueAndIsDeletedFalse();
        }

        // 1시간 뒤에 실행되도록 스케줄을 설정
        Runnable task = () -> {
            // 좋아요 수를 증가시키는 로직
            log.info("좋아요 증가 로직 실행");
            for(Character character : characters) {
                likeRepository.save(new Like(post, character));
                post.increaseLike();
                log.info("좋아요 증가 characterId : " + character.getCharacterId());
                postRepository.save(post);

            }
        };

        // 1시간 뒤에 task 실행
        new Thread(() -> {
            try {
                Thread.sleep(delay);
                task.run();
                log.info("좋아요 갯수 : " + post.getTotalLike());
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }).start();
    }
}
