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
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.vote.domain.MemberVote;
import com.aintopia.aingle.vote.domain.Vote;
import com.aintopia.aingle.vote.dto.VoteCharacterDetailResponse;
import com.aintopia.aingle.vote.dto.VoteResponse;
import com.aintopia.aingle.vote.exception.*;
import com.aintopia.aingle.vote.repository.MemberVoteRepository;
import com.aintopia.aingle.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class VoteService {
    private final VoteRepository voteRepository;
    private final CharacterRepository characterRepository;
    private final CharacterImageRepository characterImageRepository;
    private final MemberRepository memberRepository;
    private final MemberVoteRepository memberVoteRepository;
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
        Vote vote = voteRepository.findById(currentVoteId).orElseThrow(NotFoundVoteException::new);
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

    @Transactional(readOnly = true)
    public VoteCharacterDetailResponse getVoteCharacterDetailById(Long characterId) {
        Vote vote = voteRepository.findById(currentVoteId).orElseThrow(NotFoundVoteException::new);
        // 해당 캐릭터id와 지금 투표
        Character character = characterRepository.findByCharacterIdAndIsDeletedFalseAndVote(characterId, vote).orElseThrow(NotFoundVoteCharacterException::new);
        CharacterImage characterImage = characterImageRepository.findById(characterId).orElseThrow(NotFoundCharacterImageException::new);
        return VoteCharacterDetailResponse.builder()
                .character(character)
                .imageUrl(characterImage.getImageUrl())
                .build();
    }

    public VoteResponse voteCharacter(Long characterId, Long memberId) {
        //해당 사용자가 이번 투표에서 이미 투표했다면
        // 투표한 시간이 지금보다 24시간 후가 아니라면 투표 불가
        // 투표가 종료되면 해당 컬럼 다 초기화
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Vote vote = voteRepository.findById(currentVoteId).orElseThrow(NotFoundVoteException::new);
        // 해당 캐릭터id와 지금 투표
        Character character = characterRepository.findByCharacterIdAndIsDeletedFalseAndVote(characterId, vote).orElseThrow(NotFoundVoteCharacterException::new);
        Optional<MemberVote> memberVote = memberVoteRepository.findByMemberAndVote(member, vote);
        if(memberVote.isEmpty()){
            //한번도 투표한 적 없음
            memberVoteRepository.save(MemberVote.builder()
                            .vote(vote)
                            .member(member)
                            .build());
            vote(characterId);
            return new VoteResponse(character.getVoteCount(), "투표에 성공했습니다.");
        }
        MemberVote existingMemberVote = memberVote.get();
        if(canVote(existingMemberVote.getVoteTime())){
            vote(characterId);
            existingMemberVote.updateVoteTime();
            return new VoteResponse(character.getVoteCount(), "투표에 성공했습니다.");
        }else{
            throw new BadRequestVoteException();
        }

    }

    private void vote(Long characterId){
        Character character = characterRepository.findById(characterId).orElseThrow(NotFoundCharacterException::new);
        character.plusVoteCount();
    }

    private boolean canVote(LocalDateTime voteTime){
        // 현재 시각과 vote_time의 차이를 24시간으로 비교
        long hoursDifference = ChronoUnit.HOURS.between(voteTime, LocalDateTime.now());
        return hoursDifference >= 24; // 24시간 이상 경과하면 투표 가능
    }

    public void registerCharacterToVote(Long characterId, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        Character character = characterRepository.findById(characterId).orElseThrow(NotFoundCharacterException::new);
        Vote vote = voteRepository.findById(currentVoteId).orElseThrow(NotFoundVoteException::new);
        //이미 등록된 캐릭터
        //해당 voteId를 가지고, 삭제되지 않은 캐릭터만 조회
        List<Character> voteCharacters = characterRepository.findByVoteAndIsDeletedFalse(vote);
        if(voteCharacters.contains(character)){
            throw new DuplicateCharacterException();
        }
        //한 사람 당 한 캐릭터만 등록 가능
        for(Character voteCharacter : voteCharacters){
            if(voteCharacter.getMember().equals(member)){
                throw new BadRequestCharacterException();
            }
        }

        character.registerVote(vote);
    }
}
