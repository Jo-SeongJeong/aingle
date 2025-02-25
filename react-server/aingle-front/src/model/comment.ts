import { ICharacter, IMember } from "./character";

export interface IComment {
  character: ICharacter | null;
  commentId: number;
  content: string;
  createTime: string;
  member: IMember | null;
  replies: Ireply[];
  adjustedCreateTime: string;
}

export interface IcreateComment {
  postId: number;
  content: string;
}

export interface Ireply {
  character: {
    characterId: number;
    name: string;
    characterImage: string;
    commentDelayTime: number;
  };
  replyId: number;
  content: string;
  createTime: string;
  member: {
    memberId: number;
    name: string;
    memberImage: string;
  };
}
