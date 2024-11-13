package com.aintopia.aingle.post.service;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.dto.PostCharacter;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.comment.dto.CommentDto;
import com.aintopia.aingle.comment.repository.CommentRepository;
import com.aintopia.aingle.comment.service.CommentService;
import com.aintopia.aingle.common.dto.CreateAIPostResponseDto;
import com.aintopia.aingle.common.service.S3Service;
import com.aintopia.aingle.follow.dto.FollowInfo;
import com.aintopia.aingle.follow.service.FollowService;
import com.aintopia.aingle.like.repository.LikeRepository;
import com.aintopia.aingle.like.service.LikeService;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.PostMember;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;

import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.dto.Request.RegistPostRequestDto;
import com.aintopia.aingle.post.dto.Response.PostDetailResponseDto;
import com.aintopia.aingle.post.dto.Response.PostResponseDto;
import com.aintopia.aingle.post.exception.BadReqeustPostException;
import com.aintopia.aingle.post.exception.ForbbidenPostException;
import com.aintopia.aingle.post.exception.NotFoundPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.reply.domain.Reply;
import com.aintopia.aingle.reply.dto.ReplyDto;
import com.aintopia.aingle.reply.repository.ReplyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;
    private final FollowService followService;
    private final CommentRepository commentRepository;
    private final ReplyRepository replyRepository;
    private final S3Service s3Service;
    private final MemberRepository memberRepository;
    private final CharacterRepository characterRepository;
    private final CommentService commentService;
    private final LikeRepository likeRepository;
    private final LikeService likeService;

    @Transactional
    public List<PostResponseDto> getAllPost(Long memberId, int page, int size) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotFoundMemberException::new);

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "postId"));

        // 팔로우한 캐릭터 조회
        List<FollowInfo> followInfo = followService.getFollowList(memberId).getFollowList();
        List<Character> characters = followInfo.stream()
                .map(follow -> characterRepository.findById(follow.getCharacterId()).orElse(null))
                .filter(Objects::nonNull) // null 값 제외
                .collect(Collectors.toList());

        // 페이지네이션과 최신순 정렬 적용
        Page<Post> post = postRepository.findByMemberOrCharacterInAndIsDeletedFalse(member,
                characters, pageable);

        return post.stream()
                .map(p -> convertToDto(p, member)) // Post를 PostResponseDto로 변환
                .collect(Collectors.toList());
    }

    public PostDetailResponseDto findByPostId(Long postId, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotFoundMemberException::new);
        Post post = postRepository.findById(postId).orElseThrow(NotFoundMemberException::new);
        List<Comment> comments = commentRepository.findByPost(post);

        // 댓글 리스트와 각각의 대댓글 리스트를 변환하여 함께 처리
        List<CommentDto> commentDtos = comments.stream()
                .filter(comment -> !comment.getIsDeleted())
                .map(comment -> {
                    List<Reply> replies = replyRepository.findByComment(comment);
                    return convertToCommentDto(comment, replies);
                })
                .collect(Collectors.toList());

        return convertToDetailDto(post, commentDtos, member);
    }

    @Transactional
    public void registPost(RegistPostRequestDto registPostRequestDto, MultipartFile file,
                           Long memberId) throws IOException {
        // 이미지가 있는 경우 S3에 업로드 후 URL 저장
        if (file == null || file.isEmpty()) {
            throw new BadReqeustPostException();
        }
        String url = s3Service.uploadFile(file);

        Member member = memberRepository.findById(memberId)
                .orElseThrow(NotFoundMemberException::new);

        Post post = Post.registBuilder()
                .registPostRequestDto(registPostRequestDto)
                .url(url)
                .member(member)
                .build();

        post = postRepository.save(post);

        //게시글 생성 이후 AI 댓글 요청
        // 팔로우한 캐릭터 조회
        List<FollowInfo> followInfo = followService.getFollowList(memberId).getFollowList();
        List<Character> characters = followInfo.stream()
                .map(follow -> characterRepository.findById(follow.getCharacterId()).orElse(null))
                .filter(Objects::nonNull) // null 값 제외
                .collect(Collectors.toList());
        commentService.generateAIComments(post, characters, registPostRequestDto, url);

        // 게시글 생성 이후 좋아요 자동 증가
        likeService.scheduleLikeIncrease(post);
    }

    @Transactional
    public void deleteById(Long postId, Long memberId) {
        Post post = postRepository.findById(postId).orElseThrow(NotFoundPostException::new);

        if (post.getMember() == null || !Objects.equals(memberId, post.getMember().getMemberId())) {
            throw new ForbbidenPostException();
        }

        post.delete();
        postRepository.save(post);
    }

    // Post를 PostResponseDto로 변환하는 메서드
    private PostResponseDto convertToDto(Post post, Member member) {
        PostMember memberDto = null;
        if (post.getMember() != null) {
            memberDto = post.getMember().changeDto();
        }

        PostCharacter characterDto = null;
        if (post.getCharacter() != null) {
            characterDto = post.getCharacter()
                    .changeDto(); // `changeDto` 메서드를 사용하여 `Character`를 `PostCharacter`로 변환
        }

        // 좋아요 눌렀는지 확인
        Boolean isLiked = likeRepository.existsByMemberAndPost(member, post);
        List<Comment> comments = commentRepository.findByPost(post);


        // 댓글 리스트와 각각의 대댓글 리스트를 변환하여 함께 처리
        List<CommentDto> commentDtos = comments.stream()
                .filter(comment -> !comment.getIsDeleted())
                .map(comment -> {
                    List<Reply> replies = replyRepository.findByComment(comment);
                    return convertToCommentDto(comment, replies);
                })
                .collect(Collectors.toList());
        return new PostResponseDto(
                post.getPostId(),
                post.getContent(),
                post.getImage(),
                post.getCreateTime(),
                post.getTotalLike(),
                post.getTotalComment(),
                memberDto,
                characterDto,
                isLiked,
                commentDtos
        );

    }

    // Post를 PostDetailResponseDto로 변환하는 메서드
    private PostDetailResponseDto convertToDetailDto(Post post, List<CommentDto> commentDtos,
                                                     Member member) {
        PostMember memberDto = post.getMember() != null ? post.getMember().changeDto() : null;
        PostCharacter characterDto =
                post.getCharacter() != null ? post.getCharacter().changeDto() : null;

        // 좋아요 눌렀는지 확인
        Boolean isLiked = likeRepository.existsByMemberAndPost(member, post);

        return PostDetailResponseDto.builder()
                .postId(post.getPostId())
                .content(post.getContent())
                .image(post.getImage())
                .createTime(post.getCreateTime())
                .totalLike(post.getTotalLike())
                .totalComment(post.getTotalComment())
                .member(memberDto)
                .isLiked(isLiked)
                .character(characterDto)
                .comments(commentDtos) // 변환된 댓글 리스트
                .build();
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