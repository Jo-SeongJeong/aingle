package com.aintopia.aingle.security;

import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.dto.MemberDto;
import com.aintopia.aingle.member.repository.MemberRepository;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저 존재하지 않음"));

        MemberDto memberDto = mapper.map(member, MemberDto.class);
        return new CustomUserDetail(memberDto);
    }
}
