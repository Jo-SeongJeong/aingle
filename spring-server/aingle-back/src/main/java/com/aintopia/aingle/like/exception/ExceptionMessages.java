package com.aintopia.aingle.like.exception;

public enum ExceptionMessages {

    ALREADY_LIKED("이미 좋아요를 눌렀습니다."),
    NOT_LIKED("좋아요를 누르지 않았습니다."),
    FORBIDDEN("좋아요를 누를 수 없는 글입니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
