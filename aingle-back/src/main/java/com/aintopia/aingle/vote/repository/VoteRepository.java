package com.aintopia.aingle.vote.repository;

import com.aintopia.aingle.vote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VoteRepository extends JpaRepository<Vote, Long> {
    @Query("SELECT CASE WHEN MONTH(v.createTime) = :month THEN true ELSE false END FROM Vote v WHERE v.createTime IS NOT NULL")
    boolean existsByCreateTimeMonth(@Param("month") int month);
}
