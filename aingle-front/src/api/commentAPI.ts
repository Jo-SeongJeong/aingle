import axios from "axios";
import axiosInstance from "./axiosinstance";
import { BASE_URL } from "./APIconfig";
import { IwriteComment } from "../model/comment";

//댓글 등록
// export const writeComment = async (commentInfo: IwriteComment) => {
export const writeComment = async (postId: number, content: string) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/comments`, {
      postId,
      content,
    });
    console.log("댓글 등록 성공 : ", response);
    return response.data;
  } catch (error) {
    console.error("댓글 등록 실패 : ", error);
    throw error;
  }
};

//게시글 댓/대댓글 상세조회
export const getDetailComments = async (postId: string) => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/posts/details/${postId}`
    );
    console.log("게시글 디테일 조회 성공 : ", response);
    return response.data;
  } catch (error) {
    console.error("게시글 디테일 조회 에러 : ", error);
    throw error;
  }
};

//댓글 삭제
export const deleteComment = async (postId: string) => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/posts/details/${postId}`
    );
    console.log("게시글 디테일 조회 성공 : ", response);
    return response.data;
  } catch (error) {
    console.error("게시글 디테일 조회 에러 : ", error);
    throw error;
  }
};
