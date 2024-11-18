package com.aintopia.aingle.member.exception;

public enum ExceptionMessages {

    DUPLICATE("이미 존재하는 회원입니다."),
    NOT_FOUND("해당 회원을 찾을 수 없습니다."),
    RESIGNED("해당회원은 탈퇴한 회원입니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
