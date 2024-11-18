package com.aintopia.aingle.chat.exception;

import static com.aintopia.aingle.chat.exception.ExceptionMessages.NOT_FOUND_CHARACTER;

public class ForbiddenCharacterChatException extends RuntimeException {

    public ForbiddenCharacterChatException() {
        super(NOT_FOUND_CHARACTER.getMessage());
    }
}