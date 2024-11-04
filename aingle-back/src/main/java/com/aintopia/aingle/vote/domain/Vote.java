package com.aintopia.aingle.vote.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Long voteId;

    @Column(name = "create_time")
    private LocalDateTime createTime;

    @Column(name = "end_time")
    private LocalDateTime endTime;

}