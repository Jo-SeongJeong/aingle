package com.aintopia.aingle.oauth.service;

import com.aintopia.aingle.oauth.dto.GoogleMemberResponseDto;

public interface GoogleService {
    GoogleMemberResponseDto getGoogleUser(String email);
}
