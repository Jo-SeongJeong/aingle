package com.aintopia.aingle.reply.service;

import com.aintopia.aingle.alarm.domain.Alarm;
import com.aintopia.aingle.alarm.repository.AlarmRepository;
import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.comment.exception.NotFoundCommentException;
import com.aintopia.aingle.comment.repository.CommentRepository;
import com.aintopia.aingle.common.dto.FcmDto;
import com.aintopia.aingle.common.openai.OpenAIClient;
import com.aintopia.aingle.common.service.FcmService;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.exception.NotFoundPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.reply.domain.Reply;
import com.aintopia.aingle.reply.dto.ReplyDto;
import com.aintopia.aingle.reply.dto.request.RegistReplyRequestDto;
import com.aintopia.aingle.reply.exception.ForbiddenReplyException;
import com.aintopia.aingle.reply.exception.NotFoundReplyException;
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
public class ReplyService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final AlarmRepository alarmRepository;
    private final OpenAIClient openAIClient;
    private final FcmService fcmService;

    @Transactional
    public List<CommentDto> registReply(RegistReplyRequestDto registReplyRequestDto,
        Long memberId) throws IOException {
        Comment comment = commentRepository.findById(registReplyRequestDto.getCommentId())
            .orElseThrow(NotFoundCommentException::new);
        Member member = memberRepository.findById(memberId)
            .orElseThrow(NotFoundMemberException::new);
        Post post = postRepository.findById(comment.getPost().getPostId())
            .orElseThrow(NotFoundPostException::new);

        if (comment.getIsDeleted() || post.getIsDeleted()) {
            throw new ForbiddenReplyException();
        }

        Reply reply = replyRepository.save(Reply.replyBuilder()
            .comment(comment)
            .member(member)
            .registReplyRequestDto(registReplyRequestDto)
            .build());
        openAIClient.generateReplyReplyAI(comment.getPost(), comment, member, reply);
        return getCommentsWithReplies(comment.getPost().getPostId(), member);
    }

    @Transactional
    public List<CommentDto> deleteReply(Long replyId, Long memberId) {
        Reply reply = replyRepository.findById(replyId).orElseThrow(NotFoundReplyException::new);
        Member member = memberRepository.findById(memberId)
            .orElseThrow(NotFoundMemberException::new);
        Comment c = commentRepository.findById(reply.getComment().getCommentId())
            .orElseThrow(NotFoundCommentException::new);
        Post post = postRepository.findById(c.getPost().getPostId())
            .orElseThrow(NotFoundPostException::new);

        if (post.getIsDeleted() || c.getIsDeleted() || member != reply.getMember()) {
            throw new ForbiddenReplyException();
        }

        reply.delete();
        replyRepository.save(reply);

        return getCommentsWithReplies(post.getPostId(), member);
    }

    @Transactional
    @Async
    public void generateAIReply(Post post, Comment comment, Member member) throws IOException {
        // 사용자 게시글이면 예외처리 (AI가 포스트 주인이 아님)
        if(post.getCharacter() == null) throw new ForbiddenReplyException();

        log.info("AI 대댓글 요청");
        if (comment.getIsDeleted() || post.getIsDeleted()) {
            throw new ForbiddenReplyException();
        }
        // AI 대댓글 생성
        CharacterInfo characterInfo = post.getCharacter().toDTO();
        String replyWithAI = openAIClient.createReplyByAI(post, comment, characterInfo);
        replyRepository.save(Reply.makeCharacterReply(comment, post.getCharacter(),
            new RegistReplyRequestDto(comment.getCommentId(), replyWithAI)));


        // 1. 사용자가 캐릭터 게시글에 댓글 남긴 경우
        // db에 알람 생성
        Alarm alarm = alarmRepository.save(Alarm.alarmPostBuilder()
                .member(member)
                .post(post)
                .sender(post.getCharacter())
                .build());

        // FCM 보내기
        if(member.getFcmToken() != null) {
            FcmDto fcmDto = FcmDto.builder()
                    .fcmToken(member.getFcmToken())
                    .title("새 대댓글 알림")
                    .message("나의 댓글에 대댓글이 달렸어요!!")
                    .delayMinutes(post.getCharacter().getCommentDelayTime())
                    .postId(post.getPostId())
                    .alarmId(alarm.getAlarmId())
                    .build();

            // FCM 알림을 delay-time 지연 후 전송
            if (fcmDto.getFcmToken() != null && !fcmDto.getFcmToken().isEmpty()) fcmService.scheduleNotificationWithDelay(fcmDto);
        }
    }

    // Comment 리스트와 Reply 리스트를 함께 처리하여 CommentDto 리스트 반환
    private List<CommentDto> getCommentsWithReplies(Long postId, Member member) {
        Post post = postRepository.findById(postId).orElseThrow(NotFoundPostException::new);
        List<Comment> comments = commentRepository.findByPostAndMemberIsNullOrMember(post, member);

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
