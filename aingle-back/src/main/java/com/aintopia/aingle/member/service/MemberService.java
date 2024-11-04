package com.aintopia.aingle.member.service;

import com.aintopia.aingle.common.service.S3Service;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.domain.MemberImage;
import com.aintopia.aingle.member.dto.MemberDto;
import com.aintopia.aingle.member.dto.MemberImageDto;
import com.aintopia.aingle.member.dto.request.MemberSignUpRequestDto;
import com.aintopia.aingle.member.dto.request.MemberUpdateRequestDto;
import com.aintopia.aingle.member.dto.response.MemberDetailResponseDto;
import com.aintopia.aingle.member.dto.response.MemberUpdateResponseDto;
import com.aintopia.aingle.member.exception.MemberDuplicateException;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberImageRepository;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final S3Service s3Service;
    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;

    @Transactional
    public String signUp(MemberSignUpRequestDto signUpMemberDto, MultipartFile file) throws IOException {
        Optional<Member> member = memberRepository.findByEmail(signUpMemberDto.getEmail());
        if (member.isPresent()) {
            throw new MemberDuplicateException();
        }

        // 이미지가 있는 경우 S3에 업로드 후 URL 저장
        MemberImageDto memberImageDto = new MemberImageDto();
        if (file != null && !file.isEmpty()) {
            String url = s3Service.uploadFile(file);
            memberImageDto.setMemberImage(url);
        }

        Member savedMember = memberRepository.save(Member.signupBuilder()
                .memberSignUpRequestDto(signUpMemberDto)
                .build()
        );

        if (file != null && !file.isEmpty()) {
            MemberImage memberImage = MemberImage.builder()
                    .member(savedMember)
                    .memberImage(memberImageDto.getMemberImage())
                    .build();
            memberImageRepository.save(memberImage);
        }

        return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
    }

    public MemberDetailResponseDto findById(Long memberId) {
        Optional<Member> member = memberRepository.findById(memberId);
        if (member.isEmpty()) return null;

        MemberDetailResponseDto memberDetailResponseDto = MemberDetailResponseDto.builder()
                .email(member.get().getEmail())
                .name(member.get().getName())
                .birth(member.get().getBirth())
                .language(member.get().getLanguage())
                .build();

        if(member.get().getMemberImage() != null) memberDetailResponseDto.setMemberImageDto(new MemberImageDto(member.get().getMemberId(), member.get().getMemberImage().getMemberImage()));

        return memberDetailResponseDto;
    }

    @Transactional
    public MemberUpdateResponseDto updateMember(MemberUpdateRequestDto memberUpdateRequestDto, MultipartFile file, Long memberId) throws IOException {
        Member member = memberRepository.findById(memberId).orElseThrow(
                NotFoundMemberException::new
        );

        member.updateMember(memberUpdateRequestDto);

        if(file != null && !file.isEmpty()) {
            String url = s3Service.uploadFile(file);

            MemberImage memberImage = MemberImage.builder()
                    .memberId(memberId)
                    .member(member)
                    .memberImage(url)
                    .build();
            member.updateImage(memberImage);
        }
        memberRepository.save(member);
        MemberDto memberDto = mapper.map(member, MemberDto.class);
        return new MemberUpdateResponseDto(jwtUtil.createAccessToken(memberDto));
    }

    @Transactional
    public void resignMember(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                NotFoundMemberException::new
        );
        member.resign();
        memberRepository.save(member);
    }

}
