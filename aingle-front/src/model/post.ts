export interface IPost {
  id: number;
  profileURL: string;
  writer: string;
  time: string;
  likeCnt: string;
  commentCnt: string;
  postImgURL: string;
  postText: string;
}

export interface IcreatePost {
    content : string;
    postImage : File | null;
}