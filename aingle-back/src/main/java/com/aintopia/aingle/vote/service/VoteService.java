package com.aintopia.aingle.vote.service;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.domain.CharacterImage;
import com.aintopia.aingle.character.dto.CharacterImageDto;
import com.aintopia.aingle.character.dto.response.AllCharacterResponse;
import com.aintopia.aingle.character.exception.NotFoundCharacterException;
import com.aintopia.aingle.character.repository.CharacterImageRepository;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.vote.domain.Vote;
import com.aintopia.aingle.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VoteService {
    private final VoteRepository voteRepository;
    private final CharacterRepository characterRepository;
    private final CharacterImageRepository characterImageRepository;
    private final ModelMapper mapper;

    private Long currentVoteId = 1L;

    @Scheduled(fixedDelay = 30*24*60*60*1000,  initialDelay = 3000) //이전 task의 시작 지점으로부터 정의된 시간(한달)만큼 지난 후 task 실행
    public void createMonthlyVote(){
        // 이전 투표 종료
        if(currentVoteId != null){
            Vote currentVote = voteRepository.findById(currentVoteId).orElseThrow();
            if(currentVote.getEndTime().isBefore(LocalDateTime.now())){
                log.info("투표 종료 : " + currentVote.getVoteId());
            }
        }
        // 현재 달에 해당하는 투표가 없을 때 or 투표가 아예 없을 때
        if(!voteRepository.existsByCreateTimeMonth(LocalDateTime.now().getMonthValue()) || voteRepository.findAll().isEmpty()){
            Vote newVote = voteRepository.save(Vote.builder()
                    .createTime(LocalDateTime.now())
                    .endTime(LocalDateTime.now().plusMonths(1))
                    .build());
            currentVoteId = newVote.getVoteId();
            log.info("새로운 투표 생성 : " + newVote.getVoteId());
        }

        log.info("이미 진행중인 투표가 있습니다.");
    }

    @Transactional(readOnly = true)
    public AllCharacterResponse getCharacterByVoteId() {
        List<CharacterImageDto> characterImageDtos = new ArrayList<>();
        Vote vote = voteRepository.findById(currentVoteId).orElseThrow();
        // 해당 voteId를 가지고, 삭제되지 않은 캐릭터만 조회
        List<Character> voteCharacters = characterRepository.findByVoteAndIsDeletedFalse(vote);
        // 득표수 기준으로 내림차순 정렬
        voteCharacters.sort(Comparator.comparing(Character::getVoteCount).reversed());
        log.info("voteCharacters: " + voteCharacters);
        for (Character character : voteCharacters) {
            CharacterImage characterImage = characterImageRepository.findById(character.getCharacterId()).orElseThrow(NotFoundCharacterException::new);
            CharacterImageDto characterImageDto = mapper.map(characterImage, CharacterImageDto.class);
            characterImageDtos.add(characterImageDto);
        }

        return new AllCharacterResponse(characterImageDtos);

    }

}
