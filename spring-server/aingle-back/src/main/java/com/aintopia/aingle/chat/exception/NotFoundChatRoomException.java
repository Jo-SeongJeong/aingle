package com.aintopia.aingle.chat.exception;


import static com.aintopia.aingle.chat.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundChatRoomException extends RuntimeException {

    public NotFoundChatRoomException() {
        super(NOT_FOUND.getMessage());
    }
}
