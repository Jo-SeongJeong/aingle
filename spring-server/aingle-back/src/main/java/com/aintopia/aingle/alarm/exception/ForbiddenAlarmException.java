package com.aintopia.aingle.alarm.exception;

import static com.aintopia.aingle.alarm.exception.ExceptionMessages.FORBIDDEN;

public class ForbiddenAlarmException extends RuntimeException {

    public ForbiddenAlarmException() {
        super(FORBIDDEN.getMessage());
    }
}
