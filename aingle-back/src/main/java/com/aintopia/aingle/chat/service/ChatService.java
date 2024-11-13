package com.aintopia.aingle.chat.service;

import com.aintopia.aingle.chat.domain.ChatMessage;
import com.aintopia.aingle.chat.domain.ChatRoom;
import com.aintopia.aingle.chat.dto.ChatMessageDto;
import com.aintopia.aingle.chat.dto.ChatResponse;
import com.aintopia.aingle.chat.dto.ChatRoomDto;
import com.aintopia.aingle.chat.dto.ChatRoomResponse;
import com.aintopia.aingle.chat.exception.ForbiddenChatRoomException;
import com.aintopia.aingle.chat.exception.NotFoundChatRoomException;
import com.aintopia.aingle.chat.repository.ChatMessageRepository;
import com.aintopia.aingle.chat.repository.ChatRoomRepository;
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

import java.util.ArrayList;
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

    public ChatRoomResponse getAllChatRoom(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(NotFoundMemberException::new);
        List<ChatRoom> chatRooms = chatRoomRepository.findByMember(member);
        //팔로우 로직에 추가하기
        // 팔로우 할 때마다 채팅방 생성
        if (chatRooms.isEmpty()) {
            // 초기에 채팅방 아무것도 없으면 생성
            log.info("초기 채팅방 생성하기 (내가 팔로우하고 있는 모든 캐릭터와)");
            List<Follow> followCharacters = followRepository.findByMemberAndCharacterIsDeletedFalse(member);
            for(Follow follow : followCharacters) {
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
        if(chatRoom.getMember().getMemberId() != memberId) {
            // 나의 채팅방이 아닐 때,
            throw new ForbiddenChatRoomException();
        }
        // 최신순으로 내림차순
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "chatMessageId"));

        Page<ChatMessage> chatMessages = chatMessageRepository.findByChatRoom(chatRoom, pageable);

        List<ChatMessageDto> chatMessageList = chatMessages.stream()
                .map(chatMessage -> new ChatMessageDto(chatMessage))
                .collect(Collectors.toList());

        return new ChatResponse(chatRoomId, chatMessageList);
    }
}
