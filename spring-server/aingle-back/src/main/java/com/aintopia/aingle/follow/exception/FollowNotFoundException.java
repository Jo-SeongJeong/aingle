package com.aintopia.aingle.follow.exception;


import static com.aintopia.aingle.follow.exception.ExceptionMessages.NOT_FOUND;

public class FollowNotFoundException extends RuntimeException {

    public FollowNotFoundException() {
        super(NOT_FOUND.getMessage());
    }
}
