package com.aintopia.aingle.chat.service;

import com.aintopia.aingle.character.dto.ChatCharacter;
import com.aintopia.aingle.chat.domain.ChatRoom;
import com.aintopia.aingle.chat.dto.ChatRoomDto;
import com.aintopia.aingle.chat.dto.ChatRoomResponse;
import com.aintopia.aingle.chat.repository.ChatRoomRepository;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.follow.repository.FollowRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
