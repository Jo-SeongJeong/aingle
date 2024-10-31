package com.aintopia.aingle.member.exception;

import static com.aintopia.aingle.member.domain.ExceptionMessages.RESIGNED;

public class ResignedMemberException extends RuntimeException {

    public ResignedMemberException() {
        super(RESIGNED.getMessage());
    }
}
