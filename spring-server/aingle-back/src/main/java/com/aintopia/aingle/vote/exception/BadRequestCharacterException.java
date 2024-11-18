package com.aintopia.aingle.vote.exception;


import static com.aintopia.aingle.vote.exception.ExceptionMessages.BAD_REQUEST_CHARACTER;

public class BadRequestCharacterException extends RuntimeException {

    public BadRequestCharacterException() {
        super(BAD_REQUEST_CHARACTER.getMessage());
    }
}
