package com.aintopia.aingle.reply.exception;

import static com.aintopia.aingle.reply.exception.ExceptionMessages.FORBIDDEN;

public class ForbiddenReplyException extends RuntimeException {

    public ForbiddenReplyException() {
        super(FORBIDDEN.getMessage());
    }
}
