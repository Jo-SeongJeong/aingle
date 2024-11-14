package com.aintopia.aingle.common.openai;

import com.aintopia.aingle.alarm.domain.Alarm;
import com.aintopia.aingle.alarm.repository.AlarmRepository;
import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.comment.domain.Comment;
import com.aintopia.aingle.comment.repository.CommentRepository;
import com.aintopia.aingle.common.dto.CreateAIPostResponseDto;
import com.aintopia.aingle.common.dto.FcmDto;
import com.aintopia.aingle.common.openai.model.OpenAIPrompt;
import com.aintopia.aingle.common.openai.model.PostRequest;
import com.aintopia.aingle.common.service.FcmService;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.event.CreateAIPostEvent;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.reply.domain.Reply;
import com.aintopia.aingle.reply.dto.request.RegistReplyRequestDto;
import com.aintopia.aingle.reply.exception.ForbiddenReplyException;
import com.aintopia.aingle.reply.exception.NotFoundReplyException;
import com.aintopia.aingle.reply.repository.ReplyRepository;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.util.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.metadata.Usage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.model.Media;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.OpenAiImageModel;
import org.springframework.ai.openai.OpenAiImageOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.MimeTypeUtils;

import java.io.IOException;
import java.net.URI;
import java.net.URL;

import org.springframework.web.multipart.MultipartFile;

import static com.aintopia.aingle.common.openai.model.OpenAIPrompt.*;

@Component
@RequiredArgsConstructor
@Slf4j
public class OpenAIClient {

    private final OpenAiChatModel chatModel;
    private final OpenAiImageModel imageModel;
    private final CharacterRepository characterRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final Map<Long, String> postImageDescriptionRepo = new HashMap<>(); // key : postId, value : 이미지 설명
    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;
    private final AlarmRepository alarmRepository;
    private final ApplicationEventPublisher eventPublisher;
    private final Map<Long, List<String>> chatHistory = new HashMap<>(); //key : chatRoomId, value : 최근 대화 10건

    private static final int MAX_RETRIES = 1;
    private final FcmService fcmService;

    @Transactional
    public String getChatByAI(CharacterInfo characterInfo, String chatMessage, Long chatRoomId){
        if(!chatHistory.containsKey(chatRoomId)){
            chatHistory.put(chatRoomId, new ArrayList<>());
        }
        Prompt chatPrompt = getChatPrompt(characterInfo, chatMessage, chatRoomId);
        ChatResponse chatResponse = chatModel.call(chatPrompt);
        String characterMessage = chatResponse.getResult().getOutput().getContent();
        // 채팅 history 저장
        String userHistory = CHAT_USER.makeUserChatHistory(chatMessage);
        String characterHistory = CHAT_CHARACTER.makeCharacterChatHistory(characterInfo.getName(), characterMessage);
        manageChatHistory(chatRoomId, userHistory, characterHistory);

        log.info("채팅 답변:\n{}", chatResponse.getResult().getOutput().getContent());
        return chatResponse.getResult().getOutput().getContent();
    }

    private void manageChatHistory(Long chatRoomId, String userHistory, String characterHistory){
        List<String> history = chatHistory.get(chatRoomId);
        if(history.size() > 8){
            // 가장 오래된 기록 삭제
            history.remove(0);
            history.remove(1);
        }
        history.add(userHistory);
        history.add(characterHistory);
        log.info("chat history : " + chatHistory.get(chatRoomId));
    }

    private Prompt getChatPrompt(CharacterInfo characterInfo, String chatMessage, Long chatRoomId) {
        List<Message> promptMessages = new ArrayList<>();
        // 대화 기록 불러오기
        List<String> chatList = chatHistory.get(chatRoomId);

        String prompt = AI_CHARACTER_SYSTEM_PROMPT.generateSystemPrompt(characterInfo)
                + AI_CHARACTER_CHAT_PROMPT.generateChatprompt(chatList, chatMessage);

        Message userMessage = new UserMessage(prompt);
        promptMessages.add(userMessage);
        log.info("채팅 생성 프롬프트:\n {}", promptMessages.get(0));
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }

    // 댓글 생성 함수
    public String createCommentByAI(PostRequest postRequest, CharacterInfo characterInfo)
            throws IOException {
        String imageDescription = getImageDescription(postRequest);
        Prompt prompt2 = getPromptAns(postRequest.getMessage(), imageDescription, characterInfo);
        ChatResponse chatResponse2 = chatModel.call(prompt2);
        log.info("댓글 생성 답변:\n{}", chatResponse2.getResult().getOutput().getContent());
        return chatResponse2.getResult().getOutput().getContent();
    }

    // AI 게시글 댓글에 대한 대댓글 생성 함수
    public String createReplyByAI(Post post, Comment comment, CharacterInfo characterInfo)
            throws IOException {
        String imageDescription = getImageDescription(
                PostRequest.builder().imageUrl(post.getImage()).message(post.getContent()).build());
        Prompt replyPrompt = getReplyPrompt(characterInfo, imageDescription, post, comment);
        ChatResponse replyResponse = chatModel.call(replyPrompt);
        log.info("대댓글 작성 답변:\n{}", replyResponse.getResult().getOutput().getContent());
        return replyResponse.getResult().getOutput().getContent();
    }

    @Transactional
    @Async
    public void generateReplyReplyAI(Post post, Comment comment, Member member, Reply reply)
            throws IOException {

        Character character = comment.getCharacter();
        List<Reply> replies = getCommentWithReplies(comment.getCommentId());
        // 사용자 스스로의 대댓글은 생성 안함 만약 하게 할거면 여기를 열고 연관 함수 수정해야함
        if (comment.getCharacter() == null) {
            for(Reply r : replies) {
                if(r.getCharacter() == null) continue;
                character = r.getCharacter();
                break;
            }
        }
        // 혹시라도 삭제된거 체크
        if (comment.getIsDeleted() || post.getIsDeleted()) throw new NotFoundReplyException();

        // 2. 캐릭터 댓글에 사용자가 대댓글을 남긴 경우
        log.info("사용자 대댓글에 따른 대댓글으로 답변 요청");

        // 댓글에 대한 대댓글 전부 가져오기
        // AI 대댓글 생성
        CharacterInfo characterInfo = character.toDTO();
        String replyWithAI = createReplyReply(post, comment, replies, characterInfo, reply);
        replyRepository.save(Reply.makeCharacterReply(comment, character,
                new RegistReplyRequestDto(comment.getCommentId(), replyWithAI)));

        // db에 알람 생성
        Alarm alarm = alarmRepository.save(Alarm.alarmPostBuilder()
                .member(member)
                .post(post)
                .sender(character)
                .build());

        if(post.getMember().getFcmToken() != null) {
            // FCM 보내기
            FcmDto fcmDto = FcmDto.builder()
                    .fcmToken(post.getMember().getFcmToken())
                    .title("새 대댓글 알림")
                    .message("나의 대댓글에 대댓글이 달렸어요!!")
                    .delayMinutes(comment.getCharacter().getCommentDelayTime())
                    .postId(post.getPostId())
                    .alarmId(alarm.getAlarmId())
                    .build();

            // FCM 알림을 delay-time 지연 후 전송
            if (fcmDto.getFcmToken() != null && !fcmDto.getFcmToken().isEmpty()) fcmService.scheduleNotificationWithDelay(fcmDto);
        }
    }

    // Comment 리스트와 Reply 리스트를 함께 처리하여 CommentDto 리스트 반환
    private List<Reply> getCommentWithReplies(Long commentId) {
        Optional<Comment> comment = commentRepository.findById(commentId);
        return replyRepository.findByComment(comment.get());
    }

    public String createReplyReply(Post post, Comment comment, List<Reply> replies,
                                   CharacterInfo characterInfo, Reply nowReply) throws IOException {
        StringBuilder sb = new StringBuilder();
        replies.sort(Comparator.comparing(Reply::getReplyId).reversed());
        sb.append("댓글 기록\n");
        // 위에서 캐릭터 답글에 대한 것만 이 함수로 올 수 있게 해야함
        sb.append(comment.getCharacter().getName()).append(": ").append(comment.getContent())
                .append("\n");
        if (replies.isEmpty()) {
            if (nowReply.getMember() == null) {
                sb.append("끝\n");
            } else {
                sb.append(nowReply.getMember().getName()).append(": ").append(nowReply.getContent())
                        .append("\n");
            }
        } else {
            for (Reply reply : replies) {
                // 멤벙 인지 캐릭터인지 구분 해야함
                if (reply.getMember() == null) {
                    // AI측 답글
                    sb.append(reply.getCharacter().getName()).append(": ")
                            .append(reply.getContent()).append("\n");
                } else {
                    // 사용자측 답글
                    sb.append(reply.getMember().getName()).append(": ").append(reply.getContent())
                        .append("\n");
                }
            }
        }
        log.info("댓글 및 대댓글 기록:\n{}", sb.toString());

        Prompt replyReplyPrompt = getReplyReplyPrompt(characterInfo, getImageDescription(
                        PostRequest.builder().imageUrl(post.getImage()).message(post.getContent()).build()),
                sb.toString());
        ChatResponse replyResponse = chatModel.call(replyReplyPrompt);
        log.info("대댓글에 대한 대댓글 답변:\n{}", replyResponse.getResult().getOutput().getContent());
        return replyResponse.getResult().getOutput().getContent();
    }

    // 이미지 설명 생성 함수
    private String getImageDescription(PostRequest postRequest) throws IOException {
        String imageDescription = "";
        if (!postImageDescriptionRepo.containsKey(postRequest.getPostId())) {
            Prompt prompt = getPromptKeyword(postRequest);
            ChatResponse chatResponse = chatModel.call(prompt);
            imageDescription = chatResponse.getResult().getOutput().getContent();
            log.info("게시글 분석 답변:\n{}", imageDescription);
            logTokensCount(chatResponse.getMetadata().getUsage());
            if (imageDescription.contains("I'm") || imageDescription.contains("sorry")) {
                imageDescription = "분석 내용 없음";
            }
            postImageDescriptionRepo.put(postRequest.getPostId(),
                    imageDescription + "\n 게시글 글 내용: " + postRequest.getMessage());
        } else {
            imageDescription = postImageDescriptionRepo.get(postRequest.getPostId());
        }
        return imageDescription;
    }

    private Prompt getReplyReplyPrompt(CharacterInfo characterInfo, String postImageDescription,
                                       String comment) {
        List<Message> promptMessages = new ArrayList<>();
        String prompt = OpenAIPrompt.AI_CHARACTER_CRATE_REPLY_REPLY_PROMPT.generateReplyReplyPrompt(
                postImageDescription, comment, createCharacterSystemPrompt(characterInfo));
        Message userMessage = new UserMessage(prompt);
        promptMessages.add(userMessage);
        log.info("답글에 대한 답글 생성 프롬프트:\n {}", promptMessages.get(0));
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }

    private Prompt getReplyPrompt(CharacterInfo characterInfo, String postImageDescription,
                                  Post post, Comment comment) {
        List<Message> promptMessages = new ArrayList<>();

        String prompt = OpenAIPrompt.AI_CHARACTER_CRATE_REPLY_PROMPT.generateReplyPrompt(
                postImageDescription, post, comment, createCharacterSystemPrompt(characterInfo));
        Message userMessage = new UserMessage(prompt);
        promptMessages.add(userMessage);
        log.info("답글 생성 프롬프트:\n {}", promptMessages.get(0));
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }


    // 캐릭터 생성시 게시글 생성 함수
    public CreateAIPostResponseDto createImageUrl(CharacterInfo characterInfo) throws IOException {

        // 게시글 글 생성
        ChatResponse chatResponse = chatModel.call(getPromptPost(characterInfo));
        String content = chatResponse.getResult().getOutput().getContent();

        // 글 기반 이미지 생성
        String getImageUrlPrompt = creatAIPostPrompt(content,
                createCharacterSystemPrompt(characterInfo));
        log.info("게시글 이미지 생성 프롬프트:\n{}", getImageUrlPrompt);
        ImageResponse imageResponse = imageModel.call(new ImagePrompt(getImageUrlPrompt,
                OpenAiImageOptions.builder().withQuality("hd").withStyle("vivid").withHeight(1024)
                        .withWidth(1024).build()));
        String url = imageResponse.getResult().getOutput().getUrl();
        log.info("생성 이미지 URL: {}", url);
        log.info("게시글 글:\n{}", content);
        return CreateAIPostResponseDto.builder().file(convertUrlToMultipartFile(url))
                .content(content).build();
    }

    public String createSummary(CharacterInfo characterInfo) {
        Prompt prompt = getSummaryPrompt(characterInfo);
        ChatResponse chatResponse = chatModel.call(prompt);
        log.info("한 줄 요약 답변:\n{}", chatResponse.getResult().getOutput().getContent());
        logTokensCount(chatResponse.getMetadata().getUsage());

        return chatResponse.getResult().getOutput().getContent();
    }

    @Async
    @Transactional
    public void generatePost(Character saveCharacter) {
        log.info("AI 게시글 생성 시작");

        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                CreateAIPostResponseDto postResponse = createImageUrl(
                        CharacterInfo.builder().character(saveCharacter).build()
                );
                eventPublisher.publishEvent(new CreateAIPostEvent(postResponse, saveCharacter.getCharacterId()));
                return; // 성공 시 메서드 종료
            } catch (Exception e) {
                log.error("AI Post 등록 실패 - 시도 횟수: {}", i + 1, e);
            }
        }
        throw new RuntimeException("Post 등록 실패");
    }

    private Prompt getSummaryPrompt(CharacterInfo characterInfo) {
        List<Message> promptMessages = new ArrayList<>();

        Message systemMessage = new SystemMessage(createCharacterSystemPrompt(characterInfo));
        promptMessages.add(systemMessage);

        String prompt = OpenAIPrompt.AI_CHARACTER_CREATE_SUMMARY_PROMPT.generateSummaryPrompt(
                characterInfo);
        Message userMessage = new UserMessage(prompt);
        promptMessages.add(userMessage);
        log.info("한 줄 요약 프롬프트:\n{}", promptMessages);
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());

    }

    private Prompt getPromptAns(String content, String response, CharacterInfo characterInfo) {
        List<Message> promptMessages = new ArrayList<>();
        Message userMessage = new UserMessage(
                OpenAIPrompt.AI_CHARACTER_CREATE_ANS_PROMPT.generateANS(content, response,
                        createCharacterSystemPrompt(characterInfo)));
        promptMessages.add(userMessage);
        log.info("분석에 대한 댓글 요청 프롬프트:\n{}", promptMessages.get(0));
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }

    private Prompt getPromptKeyword(PostRequest postRequest) throws IOException {
        List<Message> promptMessages = new ArrayList<>();
        promptMessages.add(
                new UserMessage(OpenAIPrompt.AI_CHARACTER_CREATE_KEYWORD_PROMPT.getPromptTemplate(),
                        new Media(MimeTypeUtils.IMAGE_PNG, URI.create(postRequest.getImageUrl()).toURL())));
        log.info("분석 프롬프트:\n{}", promptMessages.get(0));
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }


    private Prompt getPromptPost(CharacterInfo characterInfo) {
        List<Message> promptMessages = new ArrayList<>();

        Message userMessage;
        userMessage = new UserMessage(
                OpenAIPrompt.AI_CHARACTER_CREATE_POST_TEXT_PROMPT.generatePostTextPrompt(
                        createCharacterSystemPrompt(characterInfo)));
        promptMessages.add(userMessage);
        log.info("게시글 텍스트 얻는 최종 프롬프트: \n{}", promptMessages);
        return new Prompt(promptMessages,
                OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }

    private String creatAIPostPrompt(String content, String prompt) {
        return OpenAIPrompt.AI_CHARACTER_CREATE_POST_PROMPT.generateSystemPromptAddSeed(content,
                prompt);
    }

    private String createCharacterSystemPrompt(CharacterInfo characterInfo) {
        return OpenAIPrompt.AI_CHARACTER_SYSTEM_PROMPT.generateSystemPrompt(characterInfo);
    }

    private void logTokensCount(Usage usage) {
        log.debug("Tokens count Request {} Response {} Total {}", usage.getPromptTokens(),
                usage.getGenerationTokens(), usage.getTotalTokens());
    }

    public void dummy(Long id) throws IOException {
        List<Character> list = characterRepository.findByIsPublicTrueAndIsDeletedFalse();
        Optional<Post> post = postRepository.findById(id);
        for (Character character : list) {
            if (post.isPresent()) {
                int errorCount = 0;
                String commentContent = "";
                while (errorCount < 1) {
                    commentContent = createCommentByAI(
                            PostRequest.builder().message(post.get().getContent())
                                    .imageUrl(post.get().getImage()).postId(post.get().getPostId()).build(),
                            CharacterInfo.builder().character(character).build());
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
                Comment comment = Comment.makeCommentByAI(post.get(), character, commentContent);

                commentRepository.save(comment);

                post.get().increaseComment();
                log.info("현재 달고 있는 댓글: {}", character.getName());

                createCommentByAI(PostRequest.builder().imageUrl(post.get().getImage())
                                .message(post.get().getContent()).build(),
                        CharacterInfo.builder().character(character).build());
            }
        }
    }

    private boolean inappropriatenessComment(String comment) {
        return comment.contains("모르") || comment.contains("sorry") || comment.contains("can't")
                || comment.contains("사진 속") || comment.contains("I'm") || comment.contains("죄송")
                || comment.contains("제공할 수 없어") || comment.contains("이미지에 대해 알 수 없어")
                || comment.contains("도움은 줄 수 없어") || comment.contains("도움 줄 수 없어") || comment.contains(
                "I") || comment.contains("다른 이야기") || comment.contains("이미지") || comment.contains(
                "알 수 없") || comment.contains("할 수 없") || comment.contains("인식") || comment.contains(
                "분석") || comment.contains("물어보면") || comment.contains("도와줄 수 없어");
    }

    public static MultipartFile convertUrlToMultipartFile(String imageUrl) throws IOException {
        // URL에서 파일을 가져오기
        URL url = new URL(imageUrl);
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("GET");
        connection.connect();

        // InputStream을 통해 바이트 배열로 변환
        try (InputStream inputStream = connection.getInputStream()) {
            byte[] imageBytes = inputStream.readAllBytes();

            // MultipartFile 생성
            return new MockMultipartFile("file",                 // 필드 이름
                    "image.png",            // 파일 이름
                    "image/png",            // MIME 타입
                    imageBytes              // 파일 데이터
            );
        }
    }
}
