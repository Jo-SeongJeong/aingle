import axios from "axios";
import axiosInstance from "./axiosinstance";
import { BASE_URL } from "./APIconfig";
import { IregistPostRequestDto } from "../model/post";

//게시글 전체 조회
export const getAllPosts = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/posts`);
    console.log("게시글 전체 조회 성공 : ", response);
    return response.data;
  } catch (error) {
    console.error("게시글 전체 조회 에러 : ", error);
    throw error;
  }
};

//게시글 등록
export const writePost = async (postContent: IregistPostRequestDto) => {
  try {
    const formData = new FormData();

    const sendingData = {
      content: postContent.content,
    };

    formData.append("registPostRequestDto", JSON.stringify(sendingData));

    if (postContent.file) {
      formData.append("file", postContent.file);
    }

    const response = await axios.post(`${BASE_URL}/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("게시글 전체 조회 에러 : ", error);
    throw error;
  }
};

//게시글 상세 조회
export const getPostDetail = async (postId: string) => {
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

//게시글 삭제
export const deletePost = async (postId: number) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/posts/${postId}`);
    console.log("게시글 삭제 성공 : ", response);
    return response.data;
  } catch (error) {
    console.error("게시글 삭제 에러 : ", error);
    throw error;
  }
};
