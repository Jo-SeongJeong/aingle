package com.aintopia.aingle.vote.exception;

import static com.aintopia.aingle.character.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundVoteException extends RuntimeException {

    public NotFoundVoteException() {
        super(NOT_FOUND.getMessage());
    }
}
