package com.aintopia.aingle.vote.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class VoteResponse {
    private int totalVoteCount;
    private String message;
}
