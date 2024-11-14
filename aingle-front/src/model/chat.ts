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