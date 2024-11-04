package com.aintopia.aingle.character.repository;

import com.aintopia.aingle.character.domain.Character;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CharacterRepository extends JpaRepository<Character, Long> {

}
