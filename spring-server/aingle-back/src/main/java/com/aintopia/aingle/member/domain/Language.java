package com.aintopia.aingle.member.domain;

public enum Language {
    korean("korean"),
    english("english");

    private final String type;

    Language(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}
