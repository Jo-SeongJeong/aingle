package com.aintopia.aingle.like.exception;

import static com.aintopia.aingle.like.exception.ExceptionMessages.NOT_LIKED;

public class NotLikedException extends RuntimeException {

    public NotLikedException() {
        super(NOT_LIKED.getMessage());
    }
}
