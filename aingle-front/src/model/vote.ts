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

export interface VoteCharacterDetail {
  characterId: number;
  name: string;
  job: string;
  age: number;
  tone: string;
  talkType: string;
  personality: string;
  imageUrl: string;
  summary: string;
  voteCount: number;
  memberName: string;
}
