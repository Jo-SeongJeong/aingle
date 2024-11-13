package com.aintopia.aingle.chat.controller;

import com.aintopia.aingle.chat.dto.ChatResponse;
import com.aintopia.aingle.chat.dto.ChatRoomResponse;
import com.aintopia.aingle.chat.service.ChatService;
import com.aintopia.aingle.common.util.MemberInfo;
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
@RequestMapping("/chat")
public class ChatController {
    private final ChatService chatService;

    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "전체 채팅방 리스트 조회", description = "전체 채팅방 리스트 조회 API")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "채팅방 리스트 조회에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<ChatRoomResponse> getAllChatRoom() {
        Long memberId = MemberInfo.getId();
        ChatRoomResponse chatRoomResponse = chatService.getAllChatRoom(memberId);
        return ResponseEntity.ok().body(chatRoomResponse);
    }

    @GetMapping(value = "/{chatRoomId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "특정 채팅방 내 채팅리스트 조회", description = "특정 채팅방 내 채팅리스트 조회 API, 최신순으로 내림차순")
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "채팅방 내 채팅리스트 리스트 조회에 성공하였습니다!",
                    content = @Content(mediaType = "application/json")
            ),
            @ApiResponse(
                    responseCode = "500",
                    description = "Error Message 로 전달함",
                    content = @Content(mediaType = "application/json")
            ),
    })
    public ResponseEntity<ChatResponse> getChatMessageByChatRoom(@PathVariable Long chatRoomId, @RequestParam(value = "page", defaultValue = "0") int page,
                                                                 @RequestParam(value = "size", defaultValue = "10") int size) {
        Long memberId = MemberInfo.getId();
        ChatResponse chatResponse = chatService.getChatMessageByChatRoom(memberId, page, size, chatRoomId);
        return ResponseEntity.ok().body(chatResponse);
    }
}
