export interface IComment {
  character: string;
  commentId: number;
  content: string;
  createTime: string;
  member: {
    memberId: number;
    name: string;
    memberImage: string;
  };
  replies: Ireply[];
}

export interface IcreateComment {
  postId: number;
  content: string;
}

export interface Ireply {
  character: string;
  replyId: number;
  content: string;
  createTime: string;
  member: {
    memberId: number;
    name: string;
    memberImage: string;
  };
}
