export interface IComment {
    character: string;
    commentId: number;
    content: string;
    createTime: string;
    member : {
        memberId: number;
        name: string;
        memberImage: string;
    }
    // reply[] 타입 추가 예정
}


export interface IcreateComment {
  postId: number;
  content: string;
}

