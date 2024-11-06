package com.aintopia.aingle.vote.exception;

public enum ExceptionMessages {

    NOT_FOUND("해당 투표를 찾을 수 없습니다."),
    NOT_FOUND_CHARACTER("현재 투표에서 해당 캐릭터를 찾을 수 없습니다."),
    NOT_FOUND_CHARACTER_IMAGE("해당 캐릭터의 이미지를 찾을 수 없습니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
