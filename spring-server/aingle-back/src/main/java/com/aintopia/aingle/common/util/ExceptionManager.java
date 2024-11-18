package com.aintopia.aingle.common.util;

import com.aintopia.aingle.chat.exception.ForbiddenCharacterChatException;
import com.aintopia.aingle.vote.exception.BadRequestCharacterException;
import com.aintopia.aingle.vote.exception.BadRequestVoteException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionManager {
    @ExceptionHandler(BadRequestVoteException.class)
    public ResponseEntity<String> handleBadRequestPostException(BadRequestVoteException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(BadRequestCharacterException.class)
    public ResponseEntity<String> handleBadRequestPostException(BadRequestCharacterException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    @ExceptionHandler(ForbiddenCharacterChatException.class)
    public ResponseEntity<String> handleForbiddenCharacterChatException(ForbiddenCharacterChatException e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }
}
