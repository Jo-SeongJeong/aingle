package com.aintopia.aingle.character.exception;

import static com.aintopia.aingle.character.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundCharacterException extends RuntimeException {

    public NotFoundCharacterException() {
        super(NOT_FOUND.getMessage());
    }
}
