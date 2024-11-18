package com.aintopia.aingle.like.exception;

import static com.aintopia.aingle.like.exception.ExceptionMessages.ALREADY_LIKED;

public class AlreadyLikedException extends RuntimeException {

    public AlreadyLikedException() {
        super(ALREADY_LIKED.getMessage());
    }
}
