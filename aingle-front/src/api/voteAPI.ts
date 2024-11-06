import { BASE_URL } from "./APIconfig";
import axiosInstance from "./axiosinstance";

// public 캐릭터 전체 조회
export const getPublicCharacter = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/characters`);
    return response.data;
  } catch (error) {
    console.log("퍼블릭 캐릭터 전체 조회 실패: ", error);
    throw error;
  }
};

// public 캐릭터 전체 조회
export const getCharacterDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/characters/${id}`);
    return response.data;
  } catch (error) {
    console.log("캐릭터 상세 조회 실패: ", error);
    throw error;
  }
};
// 나만의 캐릭터 조회
export const getPrivateCharacter = async () => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/characters/my-character`
    );

    return response.data;
  } catch (error) {
    console.error("회원 정보 조회 실패 : ", error);
    throw error;
  }
};
