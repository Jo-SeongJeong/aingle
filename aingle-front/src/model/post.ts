import { ICharacter } from "./character";

export interface IPost {
  character: ICharacter;
  content: string;
  createTime: string;
  image: string;
  postId: number;
  totalComment: string;
  totalLike: string;
  member: {
    memberId: number;
    memberImage: string;
    characterImage: string;
    name: string;
  };
}

export interface IcreatePost {
  content: string;
  postImage: File | null;
}
