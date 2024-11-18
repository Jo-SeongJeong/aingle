package com.aintopia.aingle.alarm.exception;

import static com.aintopia.aingle.alarm.exception.ExceptionMessages.NOT_FOUND;

public class NotFoundAlarmException extends RuntimeException {

    public NotFoundAlarmException() {
        super(NOT_FOUND.getMessage());
    }
}
