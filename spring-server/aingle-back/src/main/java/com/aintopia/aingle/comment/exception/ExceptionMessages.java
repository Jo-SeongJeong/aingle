package com.aintopia.aingle.comment.exception;

public enum ExceptionMessages {

    NOT_FOUND("댓글을 찾을 수 없습니다."),
    FORBIDDEN("댓글을 등록/삭제할 수 없는 글입니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
