package com.aintopia.aingle.global.openai;

import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.global.openai.model.OpenAIPrompt;
import com.aintopia.aingle.global.openai.model.PostRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.chat.messages.Message;
import org.springframework.ai.chat.messages.SystemMessage;
import org.springframework.ai.chat.messages.UserMessage;
import org.springframework.ai.chat.metadata.Usage;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.model.Media;
import org.springframework.ai.openai.OpenAiChatModel;
import org.springframework.ai.openai.OpenAiChatOptions;
import org.springframework.ai.openai.api.OpenAiApi;
import org.springframework.stereotype.Component;
import org.springframework.util.MimeTypeUtils;

import java.io.IOException;
import java.net.URI;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class OpenAIClient {

    private final OpenAiChatModel chatModel;
    private final List<Pair<String, String>> chatHistory = new ArrayList<>();


    //댓글 생성 함수
    public String createCommentByAI(PostRequest postRequest, CharacterInfo characterInfo) throws IOException {
        Prompt prompt = getPrompt(postRequest, characterInfo);
        ChatResponse chatResponse = chatModel.call(prompt);
        log.info("chat response : " + chatResponse);
        logTokensCount(chatResponse.getMetadata().getUsage());

        String response = chatResponse.getResult().getOutput().getContent();

        chatHistory.add(Pair.of(postRequest.getMessage(), response));
        log.info(chatHistory.toString());
        return response;
    }


    private Prompt getPrompt(PostRequest postRequest, CharacterInfo characterInfo) throws IOException {
        List<Message> promptMessages = new ArrayList<>();

        Message systemMessage = new SystemMessage(createCharacterSystemPrompt(characterInfo));
        promptMessages.add(systemMessage);

        chatHistory.forEach(pair -> {
            promptMessages.add(new UserMessage(pair.getLeft()));
            promptMessages.add(new AssistantMessage(pair.getRight()));
        });

        Message userMessage;
        URL imageUrl = URI.create(postRequest.getImageUrl()).toURL();
        String postText = OpenAIPrompt.AI_CHARACTER_COMMENT_REQUEST_PROMPT + postRequest.getMessage();
        userMessage = new UserMessage(postText, new Media(MimeTypeUtils.IMAGE_PNG, imageUrl));
        promptMessages.add(userMessage);

        return new Prompt(promptMessages, OpenAiChatOptions.builder().withModel(OpenAiApi.ChatModel.GPT_4_O.getValue()).build());
    }

    private String createCharacterSystemPrompt(CharacterInfo characterInfo){
        return OpenAIPrompt.AI_CHARACTER_SYSTEM_PROMPT.generateSystemPrompt(characterInfo);
    }

    private void logTokensCount(Usage usage) {
        log.debug("Tokens count Request {} Response {} Total {}", usage.getPromptTokens(),
                usage.getGenerationTokens(), usage.getTotalTokens());
    }
}
