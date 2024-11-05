package com.aintopia.aingle.member.exception;

import static com.aintopia.aingle.member.exception.ExceptionMessages.DUPLICATE;

public class MemberDuplicateException extends RuntimeException {

    public MemberDuplicateException() {
        super(DUPLICATE.getMessage());
    }

    public MemberDuplicateException(String token) {
        super(token);
    }
}
