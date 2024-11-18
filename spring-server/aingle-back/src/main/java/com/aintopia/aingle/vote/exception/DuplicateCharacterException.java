package com.aintopia.aingle.vote.exception;


import static com.aintopia.aingle.vote.exception.ExceptionMessages.DUPLICATE_CHARACTER;

public class DuplicateCharacterException extends RuntimeException {

    public DuplicateCharacterException() {
        super(DUPLICATE_CHARACTER.getMessage());
    }
}
