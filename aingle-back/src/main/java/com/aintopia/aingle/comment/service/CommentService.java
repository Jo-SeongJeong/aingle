package com.aintopia.aingle.comment.service;

import com.aintopia.aingle.alarm.domain.Alarm;
import com.aintopia.aingle.alarm.repository.AlarmRepository;
import com.aintopia.aingle.alarm.service.AlarmService;
import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.comment.dto.Request.RegistCommentRequestDto;
import com.aintopia.aingle.comment.exception.ForbiddenCommentException;
import com.aintopia.aingle.comment.exception.NotFoundCommentException;
import com.aintopia.aingle.comment.repository.CommentRepository;
import com.aintopia.aingle.common.openai.OpenAIClient;
import com.aintopia.aingle.common.openai.model.PostRequest;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.dto.Request.RegistPostRequestDto;
import com.aintopia.aingle.post.exception.ForbbidenPostException;
import com.aintopia.aingle.post.exception.NotFoundPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.reply.domain.Reply;
import com.aintopia.aingle.reply.dto.ReplyDto;
import com.aintopia.aingle.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CommentService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final AlarmService alarmService;
    private final AlarmRepository alarmRepository;
    private final OpenAIClient openAIClient;

    public List<CommentDto> findByPostId(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(NotFoundPostException::new);

        if (post.getIsDeleted()) {
            throw new ForbbidenPostException();
        }

        return getCommentsWithReplies(post.getPostId());
    }

    @Transactional
    public List<CommentDto> registComment(RegistCommentRequestDto registCommentRequestDto,
        Long memberId) {
        Post post = postRepository.findById(registCommentRequestDto.getPostId())
            .orElseThrow(NotFoundPostException::new);
        Member member = memberRepository.findById(memberId)
            .orElseThrow(NotFoundMemberException::new);

        if (post.getIsDeleted()) {
            throw new ForbiddenCommentException();
        }

        post.increaseComment();
        postRepository.save(post);

        commentRepository.save(Comment.commentBuilder()
            .post(post)
            .member(member)
            .registCommentRequestDto(registCommentRequestDto)
            .build());

        // 게시물 작성자에게 알림(본인 게시물, 본인 댓글 아닐 때)
        if (post.getMember() != null && post.getMember() != member) {
            Member alarmMember = memberRepository.findById(post.getMember().getMemberId())
                .orElseThrow(NotFoundMemberException::new);

            alarmRepository.save(Alarm.alarmPostBuilder()
                .member(alarmMember)
                .post(post)
                .sender(member)
                .build());
        }

        return getCommentsWithReplies(post.getPostId());
    }

    @Transactional
    public List<CommentDto> deleteComment(Long commentId, Long memberId) {
        Comment c = commentRepository.findById(commentId)
            .orElseThrow(NotFoundCommentException::new);
        Member member = memberRepository.findById(memberId)
            .orElseThrow(NotFoundMemberException::new);
        Post post = postRepository.findById(c.getPost().getPostId())
            .orElseThrow(NotFoundPostException::new);

        if (post.getIsDeleted() || memberId != member.getMemberId()) {
            throw new ForbiddenCommentException();
        }

        post.decreaseComment();
        postRepository.save(post);

        c.delete();
        commentRepository.save(c);

        return getCommentsWithReplies(post.getPostId());
    }

    @Async
    @Transactional
    public void generateAIComments(Post post, List<Character> characters,
        RegistPostRequestDto registPostRequestDto, String imageUrl) throws IOException {
        log.info("AI 댓글 생성 시작 postId {}", post.getPostId());
        for (Character character : characters) {
            int errorCount = 0;
            String commentContent = "";
            while (errorCount < 3) {
                commentContent = openAIClient.createCommentByAI(PostRequest.builder()
                    .message(registPostRequestDto.getContent())
                    .imageUrl(imageUrl)
                    .build(), CharacterInfo.builder()
                    .character(character)
                    .build());
                if (inappropriatenessComment(commentContent)) {
                    errorCount++;
                    log.info("댓글 모르겠다는 에러 errorCount {}", errorCount);
                    continue;
                }
                break;
            }
            if (inappropriatenessComment(commentContent)) {
                log.info("3번 실패 해도 똑같이 인식 못하면 그냥 저장 안함 댓글 내용 {}", commentContent);
                continue;
            }
            Comment comment = Comment.makeCommentByAI(post, character, commentContent);

            commentRepository.save(comment);

            post.increaseComment();
        }
        postRepository.save(post);
    }

    private boolean inappropriatenessComment(String comment) {
        if (comment.contains("모르")) {
            return true;
        } else if (comment.contains("sorry")) {
            return true;
        } else if (comment.contains("can't")) {
            return true;
        } else if (comment.contains("사진 속")) {
            return true;
        } else if (comment.contains("I'm")) {
            return true;
        } else if (comment.contains("죄송")) {
            return true;
        } else if (comment.contains("제공할 수 없어")) {
            return true;
        } else {
            return comment.contains("도와줄 수 없어");
        }
    }

    // Comment 리스트와 Reply 리스트를 함께 처리하여 CommentDto 리스트 반환
    private List<CommentDto> getCommentsWithReplies(Long postId) {
        Post post = postRepository.findById(postId).orElseThrow(NotFoundPostException::new);
        List<Comment> comments = commentRepository.findByPost(post);

        return comments.stream()
            .filter(comment -> !comment.getIsDeleted())
            .map(comment -> {
                List<Reply> replies = replyRepository.findByComment(comment);
                return convertToCommentDto(comment, replies);
            })
            .collect(Collectors.toList());
    }

    // Comment를 CommentDto로 변환하는 메서드
    private CommentDto convertToCommentDto(Comment comment, List<Reply> replies) {
        PostMember memberDto = null;
        if (comment.getMember() != null) {
            memberDto = comment.getMember().changeDto();
        }

        PostCharacter characterDto = null;
        if (comment.getCharacter() != null) {
            characterDto = comment.getCharacter().changeDto();
        }

        List<ReplyDto> replyDtos = replies.stream()
            .filter(reply -> !reply.getIsDeleted())
            .map(reply -> {
                // Reply의 Member와 Character를 PostMember와 PostCharacter로 변환
                PostMember replyMemberDto =
                    reply.getMember() != null ? reply.getMember().changeDto() : null;
                PostCharacter replyCharacterDto =
                    reply.getCharacter() != null ? reply.getCharacter().changeDto() : null;

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
