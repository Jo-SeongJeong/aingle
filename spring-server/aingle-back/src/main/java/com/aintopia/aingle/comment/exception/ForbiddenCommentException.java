package com.aintopia.aingle.comment.exception;

import static com.aintopia.aingle.comment.exception.ExceptionMessages.FORBIDDEN;

public class ForbiddenCommentException extends RuntimeException {

    public ForbiddenCommentException() {
        super(FORBIDDEN.getMessage());
    }
}
