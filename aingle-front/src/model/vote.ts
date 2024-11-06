export interface CharacterGetPublicResponseDto {
  allCharacterDtos: characterImages[];
}

export interface VoteCharacterGetPublicResponseDto {
  allCharacterDtos: characterImages[];
}

interface characterImages {
  characterId: number;
  imageUrl: string;
  follow: boolean;
}
