import { BASE_URL } from "./APIconfig";
import axiosInstance from "./axiosInstance";

// 좋아요 등록시 사용하는 API
export const like = async (postId: number) => {
  try {
    // 여기 {} 객체 형태로 묶어서 보내야 서버에서 처리 가능
    const response = await axiosInstance.post(`${BASE_URL}/likes`, { postId });
    // console.log(`게시글${postId} 좋아요 등록 성공`);
    return response.data;
  } catch (error) {
    // console.error("좋아요 등록 실패 : ", error);
  }
};

// 좋아요 삭제시 사용하는 API
export const disLike = async (postId: number) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/likes`, { postId });
    // console.log(`게시글${postId} 좋아요 삭제 성공`);
    return response.data;
  } catch (error) {
    // console.error("좋아요 삭제 실패 : ", error);
  }
};
