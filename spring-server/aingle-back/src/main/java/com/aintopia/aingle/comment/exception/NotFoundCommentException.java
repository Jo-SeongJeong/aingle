package com.aintopia.aingle.comment.exception;

import static com.aintopia.aingle.comment.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundCommentException extends RuntimeException {

    public NotFoundCommentException() {
        super(NOT_FOUND.getMessage());
    }
}
