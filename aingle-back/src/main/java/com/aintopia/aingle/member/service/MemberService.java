package com.aintopia.aingle.member.service;

import com.aintopia.aingle.character.domain.Character;
import com.aintopia.aingle.character.exception.NotFoundCharacterException;
import com.aintopia.aingle.character.repository.CharacterRepository;
import com.aintopia.aingle.common.service.S3Service;
import com.aintopia.aingle.follow.domain.Follow;
import com.aintopia.aingle.follow.exception.FollowDuplicateException;
import com.aintopia.aingle.follow.repository.FollowRepository;
import com.aintopia.aingle.member.domain.Member;
import com.aintopia.aingle.member.domain.MemberImage;
import com.aintopia.aingle.member.dto.MemberDto;
import com.aintopia.aingle.member.dto.request.MemberSignUpRequestDto;
import com.aintopia.aingle.member.dto.request.MemberUpdateRequestDto;
import com.aintopia.aingle.member.dto.response.MemberDetailResponseDto;
import com.aintopia.aingle.member.dto.response.MemberUpdateResponseDto;
import com.aintopia.aingle.member.exception.MemberDuplicateException;
import com.aintopia.aingle.member.exception.NotFoundMemberException;
import com.aintopia.aingle.member.repository.MemberImageRepository;
import com.aintopia.aingle.member.repository.MemberRepository;
import com.aintopia.aingle.post.domain.Post;
import com.aintopia.aingle.post.dto.MyPagePostDto;
import com.aintopia.aingle.post.repository.PostRepository;
import com.aintopia.aingle.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final S3Service s3Service;
    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;
    private final PostRepository postRepository;
    private final FollowRepository followRepository;
    private final CharacterRepository characterRepository;

    @Transactional
    public String signUp(MemberSignUpRequestDto signUpMemberDto, MultipartFile file) throws IOException {
        Optional<Member> member = memberRepository.findByEmail(signUpMemberDto.getEmail());
        if (member.isPresent()) {
            throw new MemberDuplicateException();
        }

        // 이미지가 있는 경우 S3에 업로드 후 URL 저장
        String url = "";
        if (file != null && !file.isEmpty()) url = s3Service.uploadFile(file);

        Member signUpMember = Member.signupBuilder()
                .memberSignUpRequestDto(signUpMemberDto)
                .build();

        Member savedMember = memberRepository.save(signUpMember);

        if (url != null) {
            MemberImage memberImage = MemberImage.createImage(savedMember, url);
            MemberImage mI = memberImageRepository.save(memberImage);
            savedMember.saveImage(mI);
        }
        Character character = characterRepository.findById(signUpMemberDto.getCharacterId()).orElseThrow(NotFoundCharacterException::new);

        if(followRepository.findByMemberAndCharacter(savedMember, character).isPresent()) throw new FollowDuplicateException();

        followRepository.save(Follow.builder()
                .member(savedMember)
                .character(character)
                .build());

        return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
    }

    public MemberDetailResponseDto findById(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(
                NotFoundMemberException::new
        );

        List<Post> post = postRepository.findByMemberId(memberId);
        Integer postCount = post.size();

        List<Follow> follows = followRepository.findByMember(member);
        Integer followCount = follows.size();

        List<MyPagePostDto> postDto = post.stream()
                .sorted(Comparator.comparing(Post::getPostId).reversed()) // postId 내림차순 정렬
                .map(post1 -> MyPagePostDto.builder()
                        .postId(post1.getPostId())
                        .image(post1.getImage())
                        .build())
                .collect(Collectors.toList());

        return new MemberDetailResponseDto(postDto, postCount, followCount);
    }

    @Transactional
    public MemberUpdateResponseDto updateMember(MemberUpdateRequestDto memberUpdateRequestDto, MultipartFile file, Long memberId) throws IOException {
        Member member = memberRepository.findById(memberId).orElseThrow(
                NotFoundMemberException::new
        );

        member.updateMember(memberUpdateRequestDto);

        if(file != null && !file.isEmpty()) {
            String url = s3Service.uploadFile(file);

            MemberImage memberImage= member.getMemberImage();

            // 기존 이미지가 없는 경우 새로운 MemberImage 생성
            if (memberImage == null) {
                memberImage = MemberImage.builder()
                        .member(member)
                        .memberImage(url)
                        .build();
            }
            // 기존 이미지가 있는 경우 URL 업데이트
            else memberImage.updateMemberImage(url);

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
