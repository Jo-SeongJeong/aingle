package com.aintopia.aingle.comment.service;

import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.comment.dto.Request.RegistCommentRequestDto;
import com.aintopia.aingle.comment.exception.ForbiddenCommentException;
import com.aintopia.aingle.comment.exception.NotFoundCommentException;
import com.aintopia.aingle.comment.repository.CommentRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.exception.ForbbidenPostException;
import com.aintopia.aingle.post.exception.NotFoundPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.reply.domain.Reply;
import com.aintopia.aingle.reply.dto.ReplyDto;
import com.aintopia.aingle.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;

    public List<CommentDto> findByPostId(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(NotFoundPostException::new);

        if(post.getIsDeleted()) throw new ForbbidenPostException();

        return getCommentsWithReplies(post.getPostId());
    }

    @Transactional
    public List<CommentDto> registComment(RegistCommentRequestDto registCommentRequestDto, Long memberId) {
        Post post = postRepository.findById(registCommentRequestDto.getPostId()).orElseThrow(NotFoundPostException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);

        if(post.getIsDeleted()) throw new ForbiddenCommentException();

        post.increaseComment();
        postRepository.save(post);

        commentRepository.save(Comment.commentBuilder()
                .post(post)
                .member(member)
                .registCommentRequestDto(registCommentRequestDto)
                .build());

        return getCommentsWithReplies(post.getPostId());
    }

    @Transactional
    public List<CommentDto> deleteComment(Long commentId, Long memberId) {
        Comment c = commentRepository.findById(commentId).orElseThrow(NotFoundCommentException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);

        if(memberId != member.getMemberId()) throw new ForbiddenCommentException();

        Post post = postRepository.findById(c.getPost().getPostId()).orElseThrow(NotFoundPostException::new);

        if(post.getIsDeleted()) throw new ForbiddenCommentException();

        post.decreaseComment();
        postRepository.save(post);

        c.delete();
        commentRepository.save(c);

        return getCommentsWithReplies(post.getPostId());
    }

    // Comment 리스트와 Reply 리스트를 함께 처리하여 CommentDto 리스트 반환
    private List<CommentDto> getCommentsWithReplies(Long postId) {
        List<Comment> comments = commentRepository.findByPost_PostId(postId);

        return comments.stream()
                .filter(comment -> !comment.getIsDeleted())
                .map(comment -> {
                    List<Reply> replies = replyRepository.findByComment_CommentId(comment.getCommentId());
                    return convertToCommentDto(comment, replies);
                })
                .collect(Collectors.toList());
    }

    // Comment를 CommentDto로 변환하는 메서드
    private CommentDto convertToCommentDto(Comment comment, List<Reply> replies) {
        PostMember memberDto = null;
        if (comment.getMember() != null) memberDto = comment.getMember().changeDto();

        PostCharacter characterDto = null;
        if (comment.getCharacter() != null) characterDto = comment.getCharacter().changeDto();

        List<ReplyDto> replyDtos = replies.stream()
                .filter(reply -> !reply.getIsDeleted())
                .map(reply -> {
                    // Reply의 Member와 Character를 PostMember와 PostCharacter로 변환
                    PostMember replyMemberDto = reply.getMember() != null ? reply.getMember().changeDto() : null;
                    PostCharacter replyCharacterDto = reply.getCharacter() != null ? reply.getCharacter().changeDto() : null;

                    return ReplyDto.builder()
                            .replyId(reply.getReplyId())
                            .content(reply.getContent())
                            .createTime(reply.getCreateTime())
                            .member(replyMemberDto) // 변환된 MemberDto 설정
                            .character(replyCharacterDto) // 변환된 CharacterDto 설정
                            .build();
                })
                .collect(Collectors.toList());

        return CommentDto.builder()
                .commentId(comment.getCommentId())
                .content(comment.getContent())
                .createTime(comment.getCreateTime())
                .member(memberDto)
                .character(characterDto)
                .replies(replyDtos) // 대댓글 리스트
                .build();
    }
}
