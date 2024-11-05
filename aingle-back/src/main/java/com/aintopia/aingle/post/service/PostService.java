package com.aintopia.aingle.post.service;

import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.comment.repository.CommentRepository;
import com.aintopia.aingle.follow.dto.FollowInfo;
import com.aintopia.aingle.follow.service.FollowService;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.dto.Response.PostDetailResponseDto;
import com.aintopia.aingle.post.dto.Response.PostResponseDto;
import com.aintopia.aingle.post.exception.ForbbidenPostException;
import com.aintopia.aingle.post.exception.NotFoundPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.reply.domain.Reply;
import com.aintopia.aingle.reply.dto.ReplyDto;
import com.aintopia.aingle.reply.repository.ReplyRepository;
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
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

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

    public PostDetailResponseDto findById(Long postId) {
        Post post = postRepository.findById(postId).orElse(null);
        List<Comment> comments = commentRepository. findByPost_PostId(post.getPostId());

        // 댓글 리스트와 각각의 대댓글 리스트를 변환하여 함께 처리
        List<CommentDto> commentDtos = comments.stream()
                .filter(comment -> !comment.getIsDeleted())
                .map(comment -> {
                    List<Reply> replies = replyRepository.findByComment_CommentId(comment.getCommentId());
                    return convertToCommentDto(comment, replies);
                })
                .collect(Collectors.toList());

        return convertToDetailDto(post, commentDtos);
    }

    @Transactional
    public void deleteById(Long postId, Long memberId) {
        Post post = postRepository.findById(postId).orElseThrow(NotFoundPostException::new);

        if(post.getMember() == null || memberId != post.getMember().getMemberId()) throw new ForbbidenPostException();

        post.delete();
        postRepository.save(post);
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

    // Post를 PostDetailResponseDto로 변환하는 메서드
    private PostDetailResponseDto convertToDetailDto(Post post, List<CommentDto> commentDtos) {
        PostMember memberDto = post.getMember() != null ? post.getMember().changeDto() : null;
        PostCharacter characterDto = post.getCharacter() != null ? post.getCharacter().changeDto() : null;

        return PostDetailResponseDto.builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .image(post.getImage())
                .createTime(post.getCreateTime())
                .totalLike(post.getTotalLike())
                .totalComment(post.getTotalComment())
                .member(memberDto)
                .character(characterDto)
                .comments(commentDtos) // 변환된 댓글 리스트
                .build();
    }

    // Comment를 CommentDto로 변환하는 메서드
    private CommentDto convertToCommentDto(Comment comment, List<Reply> replies) {
        List<ReplyDto> replyDtos = replies.stream()
                .filter(reply -> !reply.getIsDeleted())
                .map(reply -> ReplyDto.builder()
                        .replyId(reply.getReplyId())
                        .content(reply.getContent())
                        .createTime(reply.getCreateTime())
                        .build())
                .collect(Collectors.toList());

        return CommentDto.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .createTime(comment.getCreateTime())
                .replies(replyDtos) // 대댓글 리스트
                .build();
    }
}