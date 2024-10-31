package com.aintopia.aingle.oauth.service;


import com.aintopia.aingle.oauth.dto.KakaoMemberResponseDto;

public interface KakaoService {
    KakaoMemberResponseDto getKakaoUser(String code);
}
