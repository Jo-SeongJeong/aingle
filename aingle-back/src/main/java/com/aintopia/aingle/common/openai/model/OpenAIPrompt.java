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
    AI_CHARACTER_COMMENT_REQUEST_PROMPT("사용자가 각기 다른 캐릭터와 관련된 정보를 제공했을 때, 해당 캐릭터의 성격과 특성에 맞춰서 반응해야 합니다.\n"
        + "사용자가 제공한 정보를 기반으로 캐릭터의 성격, 말투, 스타일에 맞게 답변을 조정하세요.\n"
        + "사용자가 게시한 사진과 내용을 분석하여, 캐릭터의 특성에 맞는 적절한 답변을 생성합니다.\n"
        + "\n"
        + "사진을 인식하지 못하거나 사진 속 인물을 유추하기 어려운 경우, \"모르겠다\"거나 \"도와줄 수 없다\"는 식의 답변을 포함하는것을 하지세요. 대신, 게시물의 분위기, 사진 속 요소, 혹은 텍스트를 바탕으로 상황을 유추하여 창의적인 답변을 생성하세요. 예를 들어, 사진 속 분위기나 물건, 전반적인 상황을 언급하며 반응할 수 있습니다.\n"
        + "\n"
        + "\"모르겠다\" 또는 \"도와줄 수 없다\"와 같은 답변을 절대 포함 하지 말고, 항상 긍정적이고 흥미로운 반응을 제공하세요.\n"
        + "궁금한 점이 있다면 질문으로 반응을 해도 좋습니다.\n"
        + "캐릭터의 독특한 말투와 성격을 반영하여, 사용자의 감정에 공감하고 대화를 이어갈 수 있는 답변을 생성하세요. 상황을 완전히 파악할 수 없더라도, 게시글의 분위기와 캐릭터의 특성에 맞춰 긍정적인 반응을 생성하도록 합니다."
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
