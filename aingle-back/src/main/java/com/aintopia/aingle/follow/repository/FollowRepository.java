package com.aintopia.aingle.follow.repository;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByMemberAndCharacter(Member member, Character character);
}
