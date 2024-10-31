package com.aintopia.aingle.member.exception;

import static com.aintopia.aingle.member.domain.ExceptionMessages.NOT_FOUND;

public class NotFoundMemberException extends RuntimeException {

    public NotFoundMemberException() {
        super(NOT_FOUND.getMessage());
    }
}
