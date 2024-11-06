import { BASE_URL } from "./APIconfig";
import axiosInstance from "./axiosinstance";

// 좋아요 등록시 사용하는 API
export const like = async(postId : number) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}/likes` , postId)
        return response.data;

    } catch (error) {
        
        console.error("좋아요 실패 : " , error);
     
    }
}

// 좋아요 삭제시 사용하는 API
export const disLike = async (postId: number) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/likes`, postId);
    return response.data;
  } catch (error) {
    console.error("좋아요 실패 : ", error);
  }
};