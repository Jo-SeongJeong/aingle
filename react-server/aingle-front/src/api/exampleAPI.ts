import axios from "axios";
import { BASE_URL } from "./APIconfig";

export const getUserInfo = async (token: string) => {
  try {
    const userResponse = await axios.get(`${BASE_URL}/api/v1/members/info`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("유저 정보 : ", userResponse.data.data);
    return userResponse.data.data;
  } catch (error) {
    // console.log("회원 정보 조회 오류: ", error);
    throw error;
  }
};
