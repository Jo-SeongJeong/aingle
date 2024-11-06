package com.aintopia.aingle.vote.service;

import com.aintopia.aingle.vote.domain.Vote;
import com.aintopia.aingle.vote.repository.VoteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoteService {
    private final VoteRepository voteRepository;
    private Long currentVoteId = 1L;

    @Scheduled(fixedDelay = 30*24*60*60*1000,  initialDelay = 3000) //이전 task의 시작 지점으로부터 정의된 시간(한달)만큼 지난 후 task 실행
    @Transactional
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
}
