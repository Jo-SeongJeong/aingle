
// Recoil에서 관리하는 userDataState 인터페이스
export interface IuserDataState {
  id: number;
  email: string;
  name: string;
  language: string;
  birth: string;
  file: File | null;
  token: string;
  iat: number;
  exp: number;
}

// 회원가입때 사용하는 인터페이스
export interface ImemberSignUpRequestDto {
  name: string;
  email: string;
  birth: string;
  platform: "kakao" | "google";
  language: "korean" | "english";
  file: File | null;
}

// 회원 정보 수정에 사용하는 인터페이스
export type ImemberUpdateRequestDto = {
  [key in | "name" | "birth" | "language" | "file"]?: ImemberSignUpRequestDto[key];
};
