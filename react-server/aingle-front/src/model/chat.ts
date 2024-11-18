export interface Inumbers {
    chatRoomId : number;
    page : number;
    size : number;
}


export interface Icharacter {
    characterId : number;
    name : string;
    characterImage : string;
}

export interface IpostChat {
    chatRoomId : number;
    message : string;
}

export interface IchatRoom {
    chatRoomId : number;
    lastMessage : string;
    lastMessageTime : string;
    character : Icharacter;
}

export interface IchatRoomDetail {
    character : Icharacter | null;
    chatMessageId : number;
    createTime : string;
    memberId : number | null;
    message : string;
}