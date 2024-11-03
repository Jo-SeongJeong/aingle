import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // 이 키로 localStorage에 저장됩니다
  storage: localStorage, // localStorage를 사용하거나 sessionStorage로 변경 가능
});

export const userDataState = atom({
  key: "userDataState", // 고유한 키
  default: {
    nickName: "",
    exp: 0,
    profile: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const userIdState = atom({
  key: "userIdState",
  default: {
    id: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const geolocationState = atom({
  key: "geolocationState",
  default: {
    longitude: 0,
    latitude: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const locationState = atom({
  key: "locationState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
