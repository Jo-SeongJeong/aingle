package com.aintopia.aingle.character.exception;


import static com.aintopia.aingle.character.exception.ExceptionMessages.CREATE_LIMIT;

public class CharacterForbiddenException extends RuntimeException {

    public CharacterForbiddenException() {
        super(CREATE_LIMIT.getMessage());
    }
}
