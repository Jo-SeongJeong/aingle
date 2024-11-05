package com.aintopia.aingle.character.exception;

public enum ExceptionMessages {

    NOT_FOUND("해당 캐릭터를 찾을 수 없습니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
