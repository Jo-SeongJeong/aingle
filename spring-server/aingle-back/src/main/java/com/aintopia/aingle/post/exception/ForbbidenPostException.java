package com.aintopia.aingle.post.exception;

import static com.aintopia.aingle.post.exception.ExceptionMessages.FORBIDDEN;

public class ForbbidenPostException extends RuntimeException {

    public ForbbidenPostException() {
        super(FORBIDDEN.getMessage());
    }
}
