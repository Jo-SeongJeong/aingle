package com.aintopia.aingle.vote.exception;


import static com.aintopia.aingle.vote.exception.ExceptionMessages.NOT_FOUND_CHARACTER_IMAGE;

public class NotFoundCharacterImageException extends RuntimeException {

    public NotFoundCharacterImageException() {
        super(NOT_FOUND_CHARACTER_IMAGE.getMessage());
    }
}
