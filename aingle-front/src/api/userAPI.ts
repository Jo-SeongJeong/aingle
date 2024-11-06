import axios from "axios";
import { BASE_URL } from "./APIconfig";
import {
  ImemberSignUpRequestDto,
  ImemberUpdateRequestDto,
} from "../model/user";
import axiosInstance from "./axiosinstance";

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

//회원정보 조회(본인 게시글 수 및 어쩌구)
// export const getMyInfo = async () => {
//   try {
//     const response = await axiosInstance.get(`${BASE_URL}/members`);

//     return response.data.data;
//   } catch (error) {
//     console.error("회원 정보 조회 실패 : ", error);
//     throw error;
//   }
// };
