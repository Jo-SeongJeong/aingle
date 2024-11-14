import axiosInstance from "./axiosInstance";
import { BASE_URL } from "./APIconfig";
import {IpostChat} from "../model/chat";

export const getChatList = async() => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/chat`);
        return response.data.chatRoomDtoList;
    } catch (error) {
        console.error("채팅 리스트 가져오기 실패 : " , error);
    }
};


export const getChatDetail = async(chatRoomId : number) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}/chat/${chatRoomId}`);

        return response.data;
    } catch (error) {
        console.error("채팅방 디테일 불러오기 실패 : " , error);
    }
}

export const postChat = async(chat : IpostChat) => {

    const {chatRoomId , message} = chat;

    try {
        const response = await axiosInstance.post(`${BASE_URL}/chat/${chatRoomId}` , {message} );
        return response.data;
    } catch (error) {
        console.error("채팅 보내기 실패 : " , error);
    }
}