package com.aintopia.aingle.vote.repository;

import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.vote.domain.MemberVote;
import com.aintopia.aingle.vote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberVoteRepository extends JpaRepository<MemberVote, Long> {
    Optional<MemberVote> findByMemberAndVote(Member member, Vote vote);
}
