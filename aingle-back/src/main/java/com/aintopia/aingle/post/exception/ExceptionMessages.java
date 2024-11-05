package com.aintopia.aingle.post.exception;

public enum ExceptionMessages {

    NOT_FOUND("해당 게시글을 찾을 수 없습니다."),
    FORBIDDEN("게시글 삭제 권한이 없습니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
