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
        "%s"),
    AI_CHARACTER_COMMENT_REQUEST_PROMPT("사용자가 올린 사진과 내용이 담긴 sns게시글을 보고 적절한 반응을 해줘. 내용 : "),
    AI_CHARACTER_CREATE_SUMMARY_PROMPT("%s이 자주하는 말이나 %s을 표현할 수 있는 대표적인 말을 15자 이내로 해줘."),
    AI_CHARACTER_CREATE_POST_TEXT_PROMPT("%s(이)가 사진과 함께 SNS에 작성할 만한 글을 작성해줘 해당 인물의 성향을 잘 적용해서 짧아도 되지만 최대 200자를 넘어서는 안돼"),
    AI_CHARACTER_CREATE_POST_PROMPT("%s이(가) SNS에 [ %s ]라고 글을 작성했어 이 글에 어울리는 실제 같은 이미지를 생성해줘");

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
