import { ICharacter } from "./character";
import { IMember } from "./character";
import { IComment } from "./comment";

export interface IPost {
  comments: IComment[];
  character: ICharacter;
  content: string;
  createTime: string;
  image: string;
  isLiked: boolean;
  postId: number;
  totalComment: string;
  totalLike: string;
  member: IMember;
}

export interface IcreatePost {
  content: string;
  postImage: File | null;
}
