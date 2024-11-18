package com.aintopia.aingle.follow.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByMemberAndCharacter(Member member, Character character);
    List<Follow> findByMemberAndCharacterIsDeletedFalse(Member member);
    @Query("SELECT COUNT(f) FROM Follow f WHERE f.character.characterId = :characterId")
    int countByCharacterId(@Param("characterId") Long characterId);

}
