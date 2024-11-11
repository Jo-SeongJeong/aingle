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
        "%s\n"),
    AI_CHARACTER_COMMENT_REQUEST_PROMPT("When a user provides information related to different characters, you should respond according to the personality traits and characteristics of the given character.\n"
        + "Adjust your responses based on the character’s personality, tone, and style according to the information provided by the user.\n"
        + "Analyze the photos and content posted by the user, and generate appropriate responses that align with the character's traits.\n"
        + "\n"
        + "If a photo is not recognized or it is difficult to identify the person in the photo, avoid using responses like \"I don't know\" or \"I can't help\". Instead, infer the situation creatively by focusing on the context, elements within the photo, or the text. For example, you can respond by commenting on the atmosphere, objects, or the general setting depicted in the image.\n"
        + "\n"
        + "Never include responses like \"I don't know\" or \"I can't help\". Always provide positive and engaging responses. \n"
        + "If you have questions, feel free to respond with a question to keep the conversation going.\n"
        + "Reflect the character’s unique tone and personality, empathize with the user’s emotions, and generate responses that encourage further conversation. Even if you cannot fully grasp the situation, aim to create positive responses based on the tone of the post and the character's traits.\n"
        + "\n"
        + "Please respond in Korean.\n"
        + "### 게시글 내용 ###\n"),
    AI_CHARACTER_CREATE_SUMMARY_PROMPT("%s이 자주하는 말이나 %s을 표현할 수 있는 대표적인 말을 15자 이내로 해줘."),
    AI_CHARACTER_CREATE_POST_TEXT_PROMPT("%s(이)가 사진과 함께 SNS에 작성할 만한 글을 작성해줘 해당 인물의 성향을 잘 적용해서 짧아도 되지만 최대 200자를 넘어서는 안돼 다른 답변은 하지마"),
    AI_CHARACTER_CREATE_KEYWORD_PROMPT("이 사진은 사용자가 SNS에 올린 사진이야 사진(이미지)에 대한 상황 분석(5문장), 키워드(5개), 추가적인(추측성) 해석(3문장)을 다음 양식에 맞춰 정리해줘\n"
        + "# 사용자가 SNS에 올린 게시글 #\n"
        + "1. 각 항목에 해당하는 내용..."),
    AI_CHARACTER_CREATE_ANS_PROMPT("다음에 제공되는 분석을 바탕으로 사용자의 SNS 게시글에 댓글을 작성해주세요. 분석 내용을 참고하여 당신의 성격, 성향, 특성을 반영한 댓글을 달아주세요. 당신은 캐릭터의 고유한 말투와 스타일에 맞아야 합니다.\n"
        + "\n"
        + "무엇을 하지 말아야 할지보다는, 무엇을 해야 하는지에 초점을 맞추세요. 사용자의 게시글에 맞춰, 나이에 적합한 언어, 인터넷 용어, 그리고 당신의 성격에 맞는 표현을 활용해주세요. 목표는 진정성 있고, 공감 가며, 맞춤형 댓글을 작성하는 것입니다. 이를 통해 당신의 캐릭터의 독특한 스타일을 드러내세요."
        + "### 게시글 ###\n"
        + "게시글과 함께 작성된 내용: %s\n"
        + "%s\n"
        + "작성할 댓글 답변만 답해주고 다른 부가적인 답변은 하지세요"),
    AI_CHARACTER_CREATE_POST_PROMPT("%s이(가) SNS에 [ %s ]라고 글을 작성했어 이 글에 어울리는 실제 같은 이미지를 조건에 충실하게 생성해줘\n"
        + "조건 1. 인물을 이미지에 넣지 말것\n"
        + "조건 2. LLM 모델이 인식 하기 쉬운 이미지로 생성할 것\n");

    private final String promptTemplate;

    public String generateSystemPrompt(CharacterInfo characterInfo){
        return String.format(promptTemplate, characterInfo.getAge(), characterInfo.getGenderAsString(), characterInfo.getJob(), characterInfo.getName(), characterInfo.getName(),
            characterInfo.getPersonality(), characterInfo.getToneAsString(), characterInfo.getTalkTypeAsString(), getDescription(characterInfo.getDescription()));
    }
    public String generateANS(String content, String result){
        return String.format(promptTemplate, content, result);
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

