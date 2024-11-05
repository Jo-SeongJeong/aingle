package com.aintopia.aingle.member.exception;

import static com.aintopia.aingle.member.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundMemberException extends RuntimeException {

    public NotFoundMemberException() {
        super(NOT_FOUND.getMessage());
    }
}
