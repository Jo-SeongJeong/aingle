import { BASE_URL } from "./APIconfig";
import { IcreatePost, IPost } from "../model/post";
import axiosInstance from "./axiosInstance";

// 게시글 전체 조회 api
export const getPost = async (): Promise<IPost[]> => {
  try {
    const response = await axiosInstance.get<IPost[]>(`${BASE_URL}/posts`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("게시글 조회 실패:", error);
    throw error;
  }
};

// 게시글 상세 조회 api
export const getPostDetail = async (postId: string) => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/posts/details/${postId}`
    );

    return response.data;
  } catch (error) {
    console.error(`${postId}번 게시글 상세 조회 실패 : `, error);
    throw error;
  }
};

// 게시글 삭제 api
export const deletePopst = async (postId: number) => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/posts/${postId}`);
    return response;
  } catch (error) {
    console.error("게시글 삭제 실패 : ", error);
    throw error;
  }
};

// 게시글 생성 api (완료)
export const createPost = async (post: IcreatePost) => {
  try {
    // 게시글 등록을 위한 formData 생성
    const formData = new FormData();

    const postData = {
      content: post.content,
    };

    // 게시글 본문을 registPostRequestDto 이름으로 append
    formData.append("registPostRequestDto", JSON.stringify(postData));

    // 게시글 사진을 file 이름으로 append
    if (post.postImage) {
      formData.append("file", post.postImage);
    }

    // formData 인수로 담아서 요청
    const response = await axiosInstance.post(`${BASE_URL}/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error("게시글 등록 실패 : ", error);
    throw error;
  }
};
