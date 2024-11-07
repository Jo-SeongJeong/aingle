import { ICharacter } from "./character";
import { IMember } from "./character";

export interface IPost {
  character: ICharacter;
  content: string;
  createTime: string;
  image: string;
  postId: number;
  totalComment: string;
  totalLike: string;
  member: IMember;
}

export interface IcreatePost {
  content: string;
  postImage: File | null;
}
