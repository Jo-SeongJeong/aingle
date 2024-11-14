import { CreateCharacter } from "../model/character";
import { BASE_URL } from "./APIconfig";
import axiosInstance from "./axiosInstance";

// public 캐릭터 전체 조회
export const getPublicCharacter = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/characters`);
    console.log("퍼블릭 캐릭터 조회 : ", response.data);
    return response.data;
  } catch (error) {
    console.log("퍼블릭 캐릭터 전체 조회 실패: ", error);
    throw error;
  }
};

// 캐릭터 상세 조회
export const getCharacterDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/characters/${id}`);
    console.log("캐릭터 상세 조회 성공 : ", response.data);
    return response.data;
  } catch (error) {
    console.log("캐릭터 상세 조회 실패: ", error);
    throw error;
  }
};
// 나만의 작은 캐릭터 조회
export const getPrivateCharacter = async () => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/characters/my-character`
    );
    console.log("내 캐릭터 조회 : ", response.data);
    return response.data;
  } catch (error) {
    console.error("나만의 작은 캐릭터 조회 실패 : ", error);
    throw error;
  }
};

// 투표 대상 캐릭터 조회
export const getVoteCharacter = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/votes`);
    return response.data;
  } catch (error) {
    console.error("투표 대상 캐릭터 조회 실패 : ", error);
    throw error;
  }
};

// 투표 대상 캐릭터 상세 조회
export const getVoteCharacterDetail = async (id: number) => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/votes/${id}`);
    return response.data;
  } catch (error) {
    console.error("투표 대상 캐릭터 상세 조회 실패 : ", error);
    throw error;
  }
};

// 투표 하기
export const doVote = async (id: number) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/votes/${id}`);
    return response.data;
  } catch (error) {
    console.error("투표 실패 : ", error);
    throw error;
  }
};

// 캐릭터 등록 하기
export const createCharacter = async (info: CreateCharacter) => {
  try {
    const formData = new FormData();

    // characterCreateRequest 필드를 JSON 문자열로 변환하여 추가
    formData.append(
      "characterCreateRequest",
      JSON.stringify(info.characterCreateRequest)
    );

    // 파일이 있으면 추가
    if (info.file) {
      formData.append("file", info.file);
    }

    const response = await axiosInstance.post(
      `${BASE_URL}/characters`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("캐릭터 등록 실패:", error);
    throw error;
  }
};

// 투표 등록 하기
export const registVote = async (id: number) => {
  try {
    await axiosInstance.post(`${BASE_URL}/votes/character`, {
      characterId: id,
    });
  } catch (error) {
    console.error("투표 등록 실패 : ", error);
    throw error;
  }
};

//캐릭터 정보 조회(캐릭터 게시글 및 ~~)
export const getCharDetail = async (characterId: number) => {
  try {
    const response = await axiosInstance.get(
      `${BASE_URL}/characters/${characterId}/post-info`
    );
    console.log(`캐릭터 ${characterId} 정보 조회 성공 : `, response.data);
    return response.data;
  } catch (error) {
    console.error(`캐릭터 ${characterId} 정보 조회 실패 : `, error);
    throw error;
  }
};

//캐릭터 삭제
export const deleteCharacter = async (characterId: number) => {
  try {
    const response = await axiosInstance.delete(
      `${BASE_URL}/characters/${characterId}`
    );
    console.log(`캐릭터 ${characterId} 삭제 성공 : `, response.data);
  } catch (error) {
    console.error(`캐릭터 ${characterId} 삭제 실패 : `, error);
    throw error;
  }
};

// 투표 종료 시간 조회
export const getExpireTime = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/votes/info`);
    console.log("종료 시간 조회 : ", response.data);
    return response.data;
  } catch (error) {
    console.log("종료 시간 조회 실패: ", error);
    throw error;
  }
};
