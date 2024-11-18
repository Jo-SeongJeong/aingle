package com.aintopia.aingle.reply.exception;

import static com.aintopia.aingle.reply.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundReplyException extends RuntimeException {

    public NotFoundReplyException() {
        super(NOT_FOUND.getMessage());
    }
}
