package com.aintopia.aingle.alarm.exception;

public enum ExceptionMessages {

    FORBIDDEN("본인 알람이 아닙니다."),
    NOT_FOUND("해당 알람을 찾을 수 없습니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
