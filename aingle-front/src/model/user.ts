export interface ImemberSignUpRequestDto {
  name: string;
  email: string;
  birth: string;
  platform: "kakao" | "google";
  language: "korean" | "english";
  file: File | null;
}

export type ImemberUpdateRequestDto = {
  [key in "name" | "birth" | "language" | "file"]?: ImemberSignUpRequestDto[key];
};