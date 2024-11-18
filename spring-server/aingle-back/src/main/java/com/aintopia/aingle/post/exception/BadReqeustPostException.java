package com.aintopia.aingle.post.exception;

import static com.aintopia.aingle.post.exception.ExceptionMessages.BAD_REQ;

public class BadReqeustPostException extends RuntimeException {

    public BadReqeustPostException() {
        super(BAD_REQ.getMessage());
    }
}
