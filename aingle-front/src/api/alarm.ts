import { IgetAlarm } from "../model/alarm";
import { BASE_URL } from "./APIconfig";
import axiosInstance from "./axiosInstance";

// 알람 조회 api
export const getAlarm = async (numbers: IgetAlarm) => {
  try {
    const { page, size } = numbers;

    const response = await axiosInstance.get(`${BASE_URL}/alarms`, {
      params: { page, size },
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    // console.error("알람 조회 실패 : ", error);
  }
};

// 알람 읽음 처리 api
export const readAlarm = async (alarmId: number) => {
  try {
    const response = await axiosInstance.patch(`${BASE_URL}/alarms/${alarmId}`);
    return response.data;
  } catch (error) {
    // console.error("알람 읽기 실패 : ", error);
  }
};
