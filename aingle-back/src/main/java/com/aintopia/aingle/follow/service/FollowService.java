package com.aintopia.aingle.follow.service;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.exception.NotFoundCharacterException;
import com.aintopia.aingle.character.repository.CharaterRepository;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.follow.exception.FollowDuplicateException;
import com.aintopia.aingle.follow.repository.FollowRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final CharaterRepository charaterRepository;

    @Transactional
    public void resistFollow(Long memberId, Long characterId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new NotFoundMemberException());
        Character character = charaterRepository.findById(characterId).orElseThrow(() -> new NotFoundCharacterException());
        //이미 팔로우한 캐릭터인 경우
        if(followRepository.findByMemberAndCharacter(member, character).isPresent()){
            throw new FollowDuplicateException();
        }

        followRepository.save(Follow.builder()
                        .member(member)
                        .character(character)
                        .build());
    }
}
