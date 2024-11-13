import axios from "axios";
import { BASE_URL } from "./APIconfig";
import {
  ImemberSignUpRequestDto,
  ImemberUpdateRequestDto,
} from "../model/user";
import axiosInstance from "./axiosInstance";

// 회원 가입 api
export const registUserInfo = async (userInfo: ImemberSignUpRequestDto) => {
  try {
    const formData = new FormData();
    const memberData = {
      name: userInfo.name,
      email: userInfo.email,
      birth: userInfo.birth,
      platform: userInfo.platform,
      language: userInfo.language,
      characterId: userInfo.characterId,
    };

    // `memberSignUpRequestDto`라는 키로 전체 데이터를 묶기
    formData.append("memberSignUpRequestDto", JSON.stringify(memberData));

    if (userInfo.file) {
      formData.append("file", userInfo.file);
    }

    const response = await axios.post(`${BASE_URL}/members/sign-up`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("회원가입 성공 : ", response.data);
    return response.data;
  } catch (error) {
    console.log("회원 가입 실패: ", error);
    throw error;
  }
};

// 회원 정보 조회 api
export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get(`${BASE_URL}/members`);
    console.log("회원 정보 조회 성공 : ", response.data);

    return response.data;
  } catch (error) {
    console.error("회원 정보 조회 실패 : ", error);
    throw error;
  }
};

// 회원 탈퇴 api
export const deleteUser = async () => {
  try {
    const response = await axiosInstance.delete(`${BASE_URL}/members`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("회원 탈퇴 실패 : ", error);
    throw error;
  }
};

// 회원 정보 수정 api
export const patchUserInfo = async (patchInfo: ImemberUpdateRequestDto) => {
  try {
    const formData = new FormData();

    const patchData = {
      name: patchInfo.name,
      birth: patchInfo.birth,
      language: patchInfo.language,
    };

    // `memberUpdateRequestDto`라는 키로 전체 데이터를 묶기
    formData.append("memberUpdateRequestDto", JSON.stringify(patchData));

    if (patchInfo.file) {
      formData.append("file", patchInfo.file);
    }

    const response = await axiosInstance.patch(
      `${BASE_URL}/members`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("회원 정보 수정 실패 : ", error);
    throw error;
  }
};

// FCM 토큰을 얻어 서버로 전송
export const requestFcmToken = async (memberId: any, token: any) => {
  try {
    // FCM 토큰을 서버에 전송하여 업데이트
    await axios.patch(`/api/members/${memberId}/fcm-tokens`, {
      fcmToken: token,
    });
    console.log("FCM 토큰이 서버에 저장되었습니다:", token);

    // console.log("FCM 토큰을 얻을 수 없습니다. 알림 권한을 확인하세요.");
  } catch (error) {
    console.error("FCM 토큰 요청 중 오류 발생:", error);
  }
};
