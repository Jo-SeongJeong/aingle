package com.aintopia.aingle.vote.exception;

public enum ExceptionMessages {

    NOT_FOUND("해당 투표를 찾을 수 없습니다."),
    NOT_FOUND_CHARACTER("현재 투표에서 해당 캐릭터를 찾을 수 없습니다."),
    NOT_FOUND_CHARACTER_IMAGE("해당 캐릭터의 이미지를 찾을 수 없습니다."),
    BAD_REQUEST_VOTE("아직 투표를 할 수 없습니다."),
    DUPLICATE_CHARACTER("이미 투표에 등록된 캐릭터입니다."),
    BAD_REQUEST_CHARACTER("이미 등록된 캐릭터가 있습니다. 1인 당 1캐릭터만 등록 가능합니다.");


    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
