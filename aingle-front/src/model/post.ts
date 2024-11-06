export interface IPost {
  character: string;
  content: string;
  createTime: string;
  image: string;
  postId: number;
  totalComment: string;
  totalLike: string;
  member: {
    memberId: number;
    memberImage: string;
    name: string;
  };
}

export interface IcreatePost {
  content: string;
  postImage: File | null;
}
