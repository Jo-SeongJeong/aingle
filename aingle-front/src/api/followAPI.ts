import { BASE_URL } from "./APIconfig";
import axiosInstance from "./axiosInstance";

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/members`);

    return response.data;
  } catch (error) {
    console.error("회원 정보 조회 실패 : ", error);
    throw error;
  }
};

//팔로우 리스트 조회
export const getFollowingList = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/characters/follows`);
    console.log("팔로우 리스트 조회 성공 : ", response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("팔로우 리스트 조회 에러 : ", error);
  }
};

//팔로우 등록
export const followBot = async (characterId: number) => {
  try {
    const response = await axiosInstance.post(
      `${BASE_URL}/characters/follows`,
      { characterId: characterId }
    );
    console.log("팔로우 등록 성공 : ", response);
    return response.data.data;
  } catch (error) {
    console.log("팔로우 등록 에러 : ", error);
  }
};

//팔로우 취소
export const unfollowBot = async (characterId: number) => {
  try {
    const response = await axiosInstance.delete(
      `${BASE_URL}/characters/follows`
    );
    console.log("팔로우 등록 성공 : ", response);
    return response.data.data;
  } catch (error) {
    console.log("팔로우 등록 에러 : ", error);
  }
};
