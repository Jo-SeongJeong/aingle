package com.aintopia.aingle.chat.exception;


import static com.aintopia.aingle.chat.exception.ExceptionMessages.FORBIDDEN_CHAT;

public class ForbiddenChatRoomException extends RuntimeException {

    public ForbiddenChatRoomException() {
        super(FORBIDDEN_CHAT.getMessage());
    }
}
