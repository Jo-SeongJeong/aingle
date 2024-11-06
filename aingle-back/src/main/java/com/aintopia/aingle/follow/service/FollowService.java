package com.aintopia.aingle.follow.service;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.domain.CharacterImage;
import com.aintopia.aingle.character.exception.NotFoundCharacterException;
import com.aintopia.aingle.character.repository.CharacterImageRepository;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.follow.dto.FollowInfo;
import com.aintopia.aingle.follow.dto.FollowListResponse;
import com.aintopia.aingle.follow.exception.FollowDuplicateException;
import com.aintopia.aingle.follow.exception.FollowNotFoundException;
import com.aintopia.aingle.follow.repository.FollowRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class FollowService {

    private final FollowRepository followRepository;
    private final MemberRepository memberRepository;
    private final CharacterRepository characterRepository;
    private final CharacterImageRepository characterImageRepository;

    public void resistFollow(Long memberId, Long characterId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Character character = characterRepository.findById(characterId).orElseThrow(NotFoundCharacterException::new);
        //이미 팔로우한 캐릭터인 경우
        if(followRepository.findByMemberAndCharacter(member, character).isPresent()){
            throw new FollowDuplicateException();
        }

        followRepository.save(Follow.builder()
                        .member(member)
                        .character(character)
                        .build());
    }

    public void deleteFollow(Long memberId, Long characterId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Character character = characterRepository.findById(characterId).orElseThrow(NotFoundCharacterException::new);
        Follow follow = followRepository.findByMemberAndCharacter(member, character).orElseThrow(FollowNotFoundException::new);
        followRepository.deleteById(follow.getFollowId());
    }

    @Transactional(readOnly = true)
    public FollowListResponse getFollowList(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        List<Follow> followsByMember = followRepository.findByMember(member);

        List<FollowInfo> followInfos = new ArrayList<>();
        for(Follow follow : followsByMember){
            CharacterImage characterImage = characterImageRepository.findById(follow.getCharacter().getCharacterId()).orElseThrow(NotFoundCharacterException::new);
            FollowInfo followInfo = FollowInfo.builder()
                    .character(follow.getCharacter())
                    .imageUrl(characterImage.getImageUrl())
                    .build();
            followInfos.add(followInfo);
        }
        return new FollowListResponse(followInfos);

    }
}
