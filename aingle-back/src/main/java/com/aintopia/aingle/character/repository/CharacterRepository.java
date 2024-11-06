package com.aintopia.aingle.character.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.vote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    int countByMember(Member member);
    List<Character> findByIsPublicTrueAndIsDeletedFalse();
    List<Character> findByMemberAndIsDeletedFalse(Member member);
    List<Character> findByVoteAndIsDeletedFalse(Vote vote);

}
