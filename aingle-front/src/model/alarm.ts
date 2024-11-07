import { IvoteWinnerCharacter } from "./vote";

// alarm에 포함되는 알림 sender 정보
export interface Isender {
    memberId : number;
    name : string;
    memberImage : string;
}

// alarm에 포함되는 게시글 정보
export interface Ipost {
    postId : number;
    image : string;
}

export interface Ialarm {
  alarmId: number;
  isRead: boolean;
  // vote 타입의 알림인 경우 post가 없기 때문에 null 처리
  post: Ipost | null;
  // 투표 알림이 아닐 경우 null이 반환되기 때문에 null 처리
  votewinnerCharacter: IvoteWinnerCharacter | null;
  createTime: string;
  // vote 타입의 알림인 경우 sender가 없기 때문에 null 처리
  sender: Isender | null;
}

export interface IgetAlarm {
    page : number;
    size : number;
}