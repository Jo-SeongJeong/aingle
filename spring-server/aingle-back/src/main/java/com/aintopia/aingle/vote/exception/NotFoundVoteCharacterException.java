package com.aintopia.aingle.vote.exception;

import static com.aintopia.aingle.vote.exception.ExceptionMessages.NOT_FOUND_CHARACTER;

public class NotFoundVoteCharacterException extends RuntimeException {

    public NotFoundVoteCharacterException() {
        super(NOT_FOUND_CHARACTER.getMessage());
    }
}
