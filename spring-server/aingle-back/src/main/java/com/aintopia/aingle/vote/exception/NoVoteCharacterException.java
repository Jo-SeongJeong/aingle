package com.aintopia.aingle.vote.exception;


import static com.aintopia.aingle.vote.exception.ExceptionMessages.NO_VOTE_CHARACTER;

public class NoVoteCharacterException extends RuntimeException {

    public NoVoteCharacterException() {
        super(NO_VOTE_CHARACTER.getMessage());
    }
}
