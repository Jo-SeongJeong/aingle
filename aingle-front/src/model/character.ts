export interface CharacterInfoShort {
  characterId: number;
  name: string;
  job: string;
  age: number;
  tone: boolean;
  personality: string;
  talkType: boolean;
  etc: any;
  imageUrl: string;
}

export interface CharacterInfo {
  characterId: number;
  name: string;
  job: string;
  age: number;
  tone: boolean;
  personality: string;
  talkType: boolean;
  etc: any;
  imageUrl: string;
  isFollowed: boolean;
}
