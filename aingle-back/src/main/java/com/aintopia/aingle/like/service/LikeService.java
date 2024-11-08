package com.aintopia.aingle.like.service;

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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LikeService {
    private final LikeRepository likeRepository;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;

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
}
