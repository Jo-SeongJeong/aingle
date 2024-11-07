package com.aintopia.aingle.character.dto.response;

import com.aintopia.aingle.character.domain.Character;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CharacterPostResponse {
    private String imageUrl;
    private String name;
    private List<String> postImageUrls;
    private int postCount;
    private int followerCount;
    private boolean isFollow;

    @Builder
    public CharacterPostResponse(Character character, List<String> postImageUrls, boolean isFollow, int followerCount){
        this.name = character.getName();
        this.imageUrl = character.getCharacterImage().getImageUrl();
        this.postImageUrls = postImageUrls;
        this.postCount = postImageUrls.size();
        this.isFollow = isFollow;
        this.followerCount = followerCount;
    }
}