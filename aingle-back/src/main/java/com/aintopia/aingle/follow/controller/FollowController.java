package com.aintopia.aingle.follow.controller;

import com.aintopia.aingle.common.util.MemberInfo;
import com.aintopia.aingle.follow.dto.FollowListResponse;
import com.aintopia.aingle.follow.service.FollowService;
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
@RequestMapping("/characters/follows")
public class FollowController {

    private final FollowService followService;

    @PostMapping(value = "")
    @Operation(summary = "팔로우 등록", description = "팔로우 등록 시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로우에 성공하였습니다!"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<Void> resistFollow(@RequestParam Long characterId){
        Long memberId = MemberInfo.getId();
        followService.resistFollow(memberId, characterId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping(value = "/{characterId}")
    @Operation(summary = "팔로우 취소", description = "팔로우 취소 시 사용하는 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로우 취소에 성공하였습니다!"
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<Void> deleteFollow(@PathVariable Long characterId){
        Long memberId = MemberInfo.getId();
        followService.deleteFollow(memberId, characterId);
        return ResponseEntity.ok().build();
    }

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "팔로우 리스트 조회", description = "현재 유저의 팔로잉 리스트 조회 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "팔로우 리스트 조회에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<FollowListResponse> getFollowList(){
        Long memberId = MemberInfo.getId();
        FollowListResponse followListResponse = followService.getFollowList(memberId);
        return ResponseEntity.ok().body(followListResponse);
    }
}
