package com.aintopia.aingle.follow.exception;


import static com.aintopia.aingle.follow.exception.ExceptionMessages.DUPLICATE;

public class FollowDuplicateException extends RuntimeException {

    public FollowDuplicateException() {
        super(DUPLICATE.getMessage());
    }
}
