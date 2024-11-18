package com.aintopia.aingle.like.exception;

import static com.aintopia.aingle.like.exception.ExceptionMessages.FORBIDDEN;

public class ForbiddenLikeException extends RuntimeException {

    public ForbiddenLikeException() {
        super(FORBIDDEN.getMessage());
    }
}
