package com.aintopia.aingle.post.exception;

import static com.aintopia.aingle.post.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundPostException extends RuntimeException {

    public NotFoundPostException() {
        super(NOT_FOUND.getMessage());
    }
}
