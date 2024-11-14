package com.aintopia.aingle.chat.service;

import com.aintopia.aingle.character.dto.CharacterInfo;
import com.aintopia.aingle.character.dto.ChatCharacter;
import com.aintopia.aingle.chat.domain.ChatMessage;
import com.aintopia.aingle.chat.domain.ChatRoom;
import com.aintopia.aingle.chat.dto.*;
import com.aintopia.aingle.chat.exception.ForbiddenCharacterChatException;
import com.aintopia.aingle.chat.exception.ForbiddenChatRoomException;
import com.aintopia.aingle.chat.exception.NotFoundChatRoomException;
import com.aintopia.aingle.chat.repository.ChatMessageRepository;
import com.aintopia.aingle.chat.repository.ChatRoomRepository;
import com.aintopia.aingle.common.openai.OpenAIClient;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.follow.repository.FollowRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;
    private final OpenAIClient openAIClient;

    public ChatRoomResponse getAllChatRoom(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        List<ChatRoom> chatRooms = chatRoomRepository.findByMember(member);
        //팔로우 로직에 추가하기
        // 팔로우 할 때마다 채팅방 생성
        if (chatRooms.isEmpty()) {
            // 초기에 채팅방 아무것도 없으면 생성
            log.info("초기 채팅방 생성하기 (내가 팔로우하고 있는 모든 캐릭터와)");
            List<Follow> followCharacters = followRepository.findByMemberAndCharacterIsDeletedFalse(member);
            for (Follow follow : followCharacters) {
                ChatRoom savedChatRoom = chatRoomRepository.save(ChatRoom.builder()
                        .member(member)
                        .character(follow.getCharacter())
                        .build());
                chatRooms.add(savedChatRoom);
            }

        }

        List<ChatRoomDto> chatRoomDtos = chatRooms.stream()
                .map(chatRoom -> ChatRoomDto.builder()
                        .chatRoom(chatRoom)
                        .build())
                .collect(Collectors.toList());

        return new ChatRoomResponse(chatRoomDtos);


    }

    @Transactional(readOnly = true)
    public ChatResponse getChatMessageByChatRoom(Long memberId, int page, int size, Long chatRoomId) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(NotFoundChatRoomException::new);
        if (!chatRoom.getMember().getMemberId().equals(memberId)) {
            // 나의 채팅방이 아닐 때,
            throw new ForbiddenChatRoomException();
        }
        if(chatRoom.getCharacter().getIsDeleted()){
            throw new ForbiddenCharacterChatException();
        }

        // 최신순으로 내림차순
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "chatMessageId"));

        Page<ChatMessage> chatMessages = chatMessageRepository.findByChatRoom(chatRoom, pageable);

        List<ChatMessageDto> chatMessageList = chatMessages.stream()
                .map(chatMessage -> new ChatMessageDto(chatMessage))
                .collect(Collectors.toList());

        return new ChatResponse(chatRoomId, chatMessageList);
    }

    public MakeChatResponse makeChat(Long memberId, Long chatRoomId, ChatRequest chatRequest) {
        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(NotFoundChatRoomException::new);
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        // 삭제된 캐릭터 채팅 불가
        if(chatRoom.getCharacter().getIsDeleted()){
            throw new ForbiddenCharacterChatException();
        }

        // 채팅 저장
        chatMessageRepository.save(ChatMessage.builder()
                .member(member)
                .chatRoom(chatRoom)
                .content(chatRequest.getMessage())
                .build());
        // AI 채팅 답변 요청
        String chatByAI = openAIClient.getChatByAI(CharacterInfo.builder()
                .character(chatRoom.getCharacter())
                .build(), chatRequest.getMessage(), chatRoomId);
        // AI 채팅 저장
        chatMessageRepository.save(ChatMessage.builder()
                .character(chatRoom.getCharacter())
                .chatRoom(chatRoom)
                .content(chatByAI)
                .build());
        // 채팅방 정보 업데이트(가장 최근 메세지)
        chatRoom.updateLastMessage(chatByAI);
        return new MakeChatResponse(chatByAI, new ChatCharacter(chatRoom.getCharacter()), LocalDateTime.now());

    }
}
