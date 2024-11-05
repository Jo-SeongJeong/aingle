export interface ImemberSignUpRequestDto {
  name: string;
  email: string;
  birth: string;
  platform: "kakao" | "google";
  language: "korean" | "english";
  file: File | null;
}
