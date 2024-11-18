package com.aintopia.aingle.post.event;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.comment.service.CommentService;
import com.aintopia.aingle.common.dto.CreateAIPostResponseDto;
import com.aintopia.aingle.common.service.S3Service;
import com.aintopia.aingle.like.service.LikeService;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.dto.Request.RegistPostRequestDto;
import com.aintopia.aingle.post.exception.BadReqeustPostException;
import com.aintopia.aingle.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class CreateAIPostEventListener {
    private final S3Service s3Service;

    private final CharacterRepository characterRepository;
    private final PostRepository postRepository;
    private final CommentService commentService;
    private final LikeService likeService;

    @EventListener
    @Transactional
    @Async
    public void registCharaterPost(CreateAIPostEvent createAIPostEvent)
            throws IOException {
        log.info("AI 게시글 이벤트 리스너");
        CreateAIPostResponseDto createAIPostResponseDto = createAIPostEvent.getCreateAIPostResponseDto();
        // 이미지가 있는 경우 S3에 업로드 후 URL 저장
        if (createAIPostResponseDto.getFile() == null || createAIPostResponseDto.getFile()
                .isEmpty()) {
            throw new BadReqeustPostException();
        }
        String url = s3Service.uploadFile(createAIPostResponseDto.getFile());

        Character character = characterRepository.findById( createAIPostEvent.getCharacterId())
                .orElseThrow(NotFoundMemberException::new);

        RegistPostRequestDto registPostRequestDto = new RegistPostRequestDto();
        registPostRequestDto.setContent(createAIPostResponseDto.getContent());
        Post post = Post.createPostForAI(registPostRequestDto, url, character);

        postRepository.save(post);

        // AI 게시글에 자신을 제외한 모든 공용 캐릭터가 댓글을 달아줌
        commentService.generateAIComments(post,
                characterRepository.findByIsPublicTrueAndIsDeletedFalseAndCharacterIdNot(createAIPostEvent.getCharacterId()), registPostRequestDto, url);
        //좋아요
        likeService.scheduleLikeIncrease(post);

    }
}
