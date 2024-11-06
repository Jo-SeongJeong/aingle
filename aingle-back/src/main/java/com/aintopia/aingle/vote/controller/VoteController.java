package com.aintopia.aingle.vote.controller;

import com.aintopia.aingle.character.dto.response.AllCharacterResponse;
import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.vote.dto.VoteCharacterDetailResponse;
import com.aintopia.aingle.vote.service.VoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/votes")
public class VoteController {
    private final VoteService voteService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "투표 후보 캐릭터 리스트 조회", description = "지금 진행 중인 투표에 참가한 캐릭터 후보 리스트 조회 API, 득표수로 정렬")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "투표 후보 캐릭터 리스트 조회에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<AllCharacterResponse> getCharacterByCurrentVote(){
        AllCharacterResponse allCharacterResponse = voteService.getCharacterByVoteId();
        return ResponseEntity.ok().body(allCharacterResponse);
    }

    @GetMapping(value = "/{characterId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "투표 후보 캐릭터 특징 상세 조회", description = "투표 후보 캐릭터 특징 상세 조회 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "투표 후보 캐릭터 특징 상세 조회에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<VoteCharacterDetailResponse> getVoteCharacterDetailById(@PathVariable Long characterId){
        VoteCharacterDetailResponse voteCharacterDetailResponse = voteService.getVoteCharacterDetailById(characterId);
        return ResponseEntity.ok().body(voteCharacterDetailResponse);
    }

    @PostMapping(value = "/{characterId}")
    @Operation(summary = "캐릭터 투표하기", description = "해당 캐릭터에 투표하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "투표에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<Void> voteCharacter(@PathVariable Long characterId){
        Long memberId = MemberInfo.getId();
        voteService.voteCharacter(characterId, memberId);
        return ResponseEntity.ok().build();
    }

    @PostMapping(value = "/character")
    @Operation(summary = "캐릭터 투표 등록", description = "투표 후보에 캐릭터 등록하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "캐릭터 등록에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<Void> registerCharacterToVote(@RequestParam Long characterId){
        Long memberId = MemberInfo.getId();
        voteService.registerCharacterToVote(characterId, memberId);
        return ResponseEntity.ok().build();
    }


}
