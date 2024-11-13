package com.aintopia.aingle.chat.exception;

public enum ExceptionMessages {

    NOT_FOUND("해당 채팅방을 찾을 수 없습니다."),
    FORBIDDEN_CHAT("나의 채팅방에만 접근할 수 있습니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
