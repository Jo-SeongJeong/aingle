package com.aintopia.aingle.character.exception;


import static com.aintopia.aingle.character.exception.ExceptionMessages.CREATE_LIMIT;

public class CharacterCreateLimitException extends RuntimeException {

    public CharacterCreateLimitException() {
        super(CREATE_LIMIT.getMessage());
    }
}
