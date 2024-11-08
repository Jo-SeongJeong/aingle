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
  tone: string;
  talkType: string;
  personality: string;
  imageUrl: string;
  summary: string;
}

export interface ICharInfo {
  name: string;
  userName: string;
  age: number;
  profileImg: string;
  job: string;
  personality: string;
  tone: string;
  talkType: string;
  createdId: number;
}

export interface CreateCharacter {
  characterCreateRequest: {
    name: string;
    job: string;
    age: number;
    tone: boolean;
    personality: string;
    talkType: boolean;
    description: string[];
    gender: boolean;
  };
  file?: File | null;
}

export interface ICharacter {
  characterId: number;
  name: string;
  characterImage: string;
  commentDelayTime: number;
}

export interface IMember {
  memberId: number; // 멤버 ID
  name: string; // 멤버 이름
  memberImage: string; // 멤버 이미지 URL
}

export interface IBotDetail {
  imageUrl: string; // 유저 프로필 이미지 URL
  name: string; // 유저 이름
  postImageUrls: {
    postId: number; // 게시물 ID
    image: string | null; // 게시물 이미지 URL 또는 null
  }[]; // 게시물 이미지 객체 배열
  postCount: number; // 게시물 수
  followerCount: number; // 팔로워 수
  follow: boolean; // 팔로우 여부
}
