package com.aintopia.aingle.member.domain;

public enum Platform {
    kakao("kakao"),
    google("google");

    private final String type;

    Platform(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
