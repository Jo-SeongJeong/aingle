export interface Ialarm {
    alarmId : number;
    isRead : boolean;
    post : {
        postId : number;
        image : string;
    }
    vote : number | null;
}

export interface IgetAlarm {
    page : number;
    size : number;
}