package com.aintopia.aingle.oauth.exception;

public class ResignedException extends RuntimeException {
    public ResignedException() {
        super("이미 탈퇴한 회원입니다.");
    }
}
