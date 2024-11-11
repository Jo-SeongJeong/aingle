package com.aintopia.aingle.common.openai.model;

import com.aintopia.aingle.character.dto.CharacterInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public enum OpenAIPrompt {
    AI_CHARACTER_SYSTEM_PROMPT("당신은 %d세 %s %s %s입니다. %s이 되어서 사용자와 대화를 진행합니다. 아래의 대화 패턴을 참고해서 질문에 대해 답변해주세요 +\n" +
        "###대화 패턴###\n" +
        "- %s 성격\n" +
        "- 답변은 %s로 한다.\n" +
        "- 답변은 %s으로 한다.\n" +
        "%s\n" 
        + "모르는 인물에 대해서는 언급하지 않는다. 인식하지 못하는것에 대해서는 언급하지 않는다."),
    AI_CHARACTER_COMMENT_REQUEST_PROMPT("When a user provides information related to different characters, you should respond according to the personality traits and characteristics of the given character.\n"
        + "You should tailor your responses to match the character's personality, tone, and style based on the information provided by the user.\n"
        + "Analyze the photos and content posted by the user, and generate appropriate responses that align with the character's traits.\n"
        + "\n"
        + "If a photo is not recognized or it is difficult to deduce who the person is, avoid stating \"I don't know\" or \"I can't help\". Instead, focus on the context, the mood of the post, or elements within the photo to generate a creative response. For example, comment on the atmosphere, objects, or the general setting you can infer from the text or image.\n"
        + "\n"
        + "You should never respond with \"I don’t know\" or \"I can’t help you\". Always provide positive, engaging, and creative responses. \n"
        + "Use the character’s unique tone and personality in your response, empathizing with the user’s emotions and encouraging further conversation. Even if you cannot fully infer the situation, generate a positive response based on the tone of the post and your character's traits.\n"
        + "\n"
        + "Please respond in Korean.\n"
        + "### 게시글 내용 ###\n"),
    AI_CHARACTER_CREATE_SUMMARY_PROMPT("%s이 자주하는 말이나 %s을 표현할 수 있는 대표적인 말을 15자 이내로 해줘."),
    AI_CHARACTER_CREATE_POST_TEXT_PROMPT("%s(이)가 사진과 함께 SNS에 작성할 만한 글을 작성해줘 해당 인물의 성향을 잘 적용해서 짧아도 되지만 최대 200자를 넘어서는 안돼 다른 답변은 하지마"),
    AI_CHARACTER_CREATE_POST_PROMPT("%s이(가) SNS에 [ %s ]라고 글을 작성했어 이 글에 어울리는 실제 같은 이미지를 조건에 충실하게 생성해줘\n"
        + "조건 1. 인물을 이미지에 넣지 말것\n"
        + "조건 2. LLM 모델이 인식 하기 쉬운 이미지로 생성할 것\n");

    private final String promptTemplate;

    public String generateSystemPrompt(CharacterInfo characterInfo){
        return String.format(promptTemplate, characterInfo.getAge(), characterInfo.getGenderAsString(), characterInfo.getJob(), characterInfo.getName(), characterInfo.getName(),
            characterInfo.getPersonality(), characterInfo.getToneAsString(), characterInfo.getTalkTypeAsString(), getDescription(characterInfo.getDescription()));
    }
    public String generateSystemPromptAddSeed(CharacterInfo characterInfo, String content) {
        return String.format(promptTemplate, characterInfo.getName(), content);
    }

    public String generateSummaryPrompt(CharacterInfo characterInfo){
        return String.format(promptTemplate, characterInfo.getName(), characterInfo.getName());
    }

    private String getDescription(List<String> description) {
        String formatted = "";
        for(String d : description) {
            formatted += ("-" + d + "\n");
        }
        return formatted;
    }
}
