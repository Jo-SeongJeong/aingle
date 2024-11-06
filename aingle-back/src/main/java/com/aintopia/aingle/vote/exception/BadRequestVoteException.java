package com.aintopia.aingle.vote.exception;


import static com.aintopia.aingle.vote.exception.ExceptionMessages.BAD_REQUEST_VOTE;

public class BadRequestVoteException extends RuntimeException {

    public BadRequestVoteException() {
        super(BAD_REQUEST_VOTE.getMessage());
    }
}
