import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist", // 이 키로 localStorage에 저장됩니다
  storage: localStorage, // localStorage를 사용하거나 sessionStorage로 변경 가능
});

export const userDataState = atom({
  key: "userDataState", // 고유한 키
  default: {
    id: 0,
    email: "",
    name: "",
    iat: 0,
    exp: 0,
    birth: "",
    language: "",
    file: "",
  },
  effects_UNSTABLE: [persistAtom],
});
