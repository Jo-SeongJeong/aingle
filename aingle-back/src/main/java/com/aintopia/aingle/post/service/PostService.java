package com.aintopia.aingle.post.service;

import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.follow.dto.FollowInfo;
import com.aintopia.aingle.follow.service.FollowService;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.dto.Response.PostResponseDto;
import com.aintopia.aingle.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final FollowService followService;

    @Transactional
    public List<PostResponseDto> getAllPost(Long memberId) {
        // 사용자 게시글 조회
        List<Post> memberPost = postRepository.findByMemberId(memberId);
        List<Post> characterPost = new ArrayList<>();

        // 팔로우 캐릭터 조회
        List<FollowInfo> followInfo = followService.getFollowList(memberId).getFollowList();

        // 팔로우 캐릭터 게시글 조회
        for (FollowInfo index : followInfo) {
            Long id = index.getCharacterId();
            List<Post> temp = postRepository.findByCharacterId(id);

            if (temp.isEmpty()) continue;

            characterPost.addAll(temp);
        }

        // 합치기
        List<Post> post = new ArrayList<>();
        post.addAll(memberPost);
        post.addAll(characterPost);

        // 최신순
        post.sort((a, b) -> b.getCreateTime().compareTo(a.getCreateTime()));

        return post.stream()
                .map(this::convertToDto) // Post를 PostResponseDto로 변환
                .collect(Collectors.toList());
    }

    // Post를 PostResponseDto로 변환하는 메서드
    private PostResponseDto convertToDto(Post post) {
        PostMember memberDto = null;
        if (post.getMember() != null) memberDto = post.getMember().changeDto();

        PostCharacter characterDto = null;
        if (post.getCharacter() != null) characterDto = post.getCharacter().changeDto(); // `changeDto` 메서드를 사용하여 `Character`를 `PostCharacter`로 변환

        return new PostResponseDto(
                post.getPostId(),
                post.getContent(),
                post.getImage(),
                post.getCreateTime(),
                post.getTotalLike(),
                post.getTotalComment(),
                memberDto,
                characterDto
        );
    }
}