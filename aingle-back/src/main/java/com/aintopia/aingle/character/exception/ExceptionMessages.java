package com.aintopia.aingle.character.exception;

public enum ExceptionMessages {

    NOT_FOUND("해당 캐릭터를 찾을 수 없습니다."),
    CREATE_LIMIT("캐릭터는 최대 3개까지 만들 수 있습니다."),
    DELETE_FORBIDDEN("내가 만든 캐릭터만 삭제할 수 있습니다.");

    private final String message;

    ExceptionMessages(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
