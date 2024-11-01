package com.aintopia.aingle.member.service;

import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.domain.MemberImage;
import com.aintopia.aingle.member.dto.MemberDto;
import com.aintopia.aingle.member.dto.request.MemberSignUpRequestDto;
import com.aintopia.aingle.member.exception.MemberDuplicateException;
import com.aintopia.aingle.member.repository.MemberImageRepository;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Transactional
    public String signUp(MemberSignUpRequestDto signUpMemberDto) {
        Optional<Member> member = memberRepository.findByEmail(signUpMemberDto.getEmail());
        if (member.isPresent()) {
            throw new MemberDuplicateException();
        }

        // 이미지가 있는 경우 S3에 업로드 후 URL 저장
//        if (signUpMemberDto.getFile() != null && !signUpMemberDto.getFile().isEmpty()) {
//            String imageUrl = saveMemberImage(signUpMemberDto.getFile(), savedMember);
//            savedMember.setImageUrl(imageUrl);
//        }


        Member savedMember = memberRepository.save(Member.signupBuilder()
                .memberSignUpRequestDto(signUpMemberDto)
                .build()
        );

        saveMemberImage(signUpMemberDto, savedMember);

        return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
    }

    private void saveMemberImage(MemberSignUpRequestDto signUpMemberDto, Member savedMember) {
        MemberImage memberImage = MemberImage.builder()
                .member(savedMember)
                .memberImage(signUpMemberDto.getMemberImage().getMemberImage())
                .build();
        memberImageRepository.save(memberImage);
    }
}
