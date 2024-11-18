package com.aintopia.aingle.reply.exception;

public enum ExceptionMessages {

    NOT_FOUND("대댓글을 찾을 수 없습니다."),
    FORBIDDEN("대댓글을 등록/삭제할 수 없는 댓글입니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
