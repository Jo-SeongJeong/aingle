package com.aintopia.aingle.character.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.vote.domain.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CharacterRepository extends JpaRepository<Character, Long> {
    int countByMemberAndIsDeletedFalse(Member member);
    List<Character> findByIsPublicTrueAndIsDeletedFalse();
    List<Character> findByMemberAndIsDeletedFalse(Member member);
    List<Character> findByVoteAndIsDeletedFalse(Vote vote);
    Optional<Character> findByCharacterIdAndIsDeletedFalseAndVote(Long characterId,Vote vote);
    @Query("SELECT c FROM Character c " +
            "WHERE c.vote.voteId = :voteId AND c.isDeleted = false " +
            "ORDER BY c.voteCount DESC, c.createTime DESC LIMIT 1")
    Optional<Character> findTopByVoteIdOrderByVoteCountDesc(@Param("voteId") Long voteId);

    List<Character> findByIsDeletedFalse();
}
