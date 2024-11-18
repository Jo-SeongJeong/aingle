package com.aintopia.aingle.follow.exception;

public enum ExceptionMessages {

    DUPLICATE("이미 존재하는 팔로우입니다."),
    NOT_FOUND("존재하지 않는 팔로우 ID입니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
