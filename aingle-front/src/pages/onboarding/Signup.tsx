import React, { useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import TextHeader from "../../components/header/TextHeader";
import grayImg from "../../assets/images/grayImg.png";
import { ImemberSignUpRequestDto } from "../../model/user";
import { useLocation, useNavigate } from "react-router-dom";
import { registUserInfo } from "../../api/userAPI";
import { characterIdState, userDataState } from "../../store/atoms";
import defaultImg from "../../assets/defaultImg.png";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const platform = location.state.method;
  const email = sessionStorage.getItem("email")!;
  const recommendId = useRecoilValue(characterIdState);
  const [inputInfo, setInputInfo] = useState<ImemberSignUpRequestDto>({
    name: "",
    email: email,
    birth: "",
    platform: platform,
    language: "korean",
    characterId: recommendId,
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const setUserData = useSetRecoilState(userDataState);

  const handleChange = (
    field: keyof ImemberSignUpRequestDto,
    value: string | File | null
  ) => {
    setInputInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("file", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 파일이 없을 경우 기본 이미지로 설정
    if (!inputInfo.file) {
      const response = await fetch(defaultImg);
      const blob = await response.blob();
      const file = new File([blob], "defaultImg.png", { type: blob.type });
      handleChange("file", file); // 기본 이미지를 파일로 설정
    }

    try {
      // 회원가입 요청
      console.log("asdfasfsad:::::" + inputInfo.characterId);
      const response = await registUserInfo(inputInfo);
      const { token, id, email, name, language, birth, file, iat, exp } =
        response;

      // 유저 정보 저장
      setUserData({
        token,
        id,
        email,
        name,
        language,
        birth,
        file,
        iat,
        exp,
      });

      // 회원가입 이후 메인 페이지로 리다이렉트
      navigate("/home");
    } catch (error) {
      console.error("회원 가입 실패 :", error);
    }
  };
  return (
    <div className="min-h-screen  relative bg-white overflow-auto">
      <TextHeader navTo={"/mypage"} headerText={"회원가입"} />
      <div className="flex flex-col h-full pt-[54px] pb-6 px-[23px] items-center">
        <form
          className="mt-[30px] w-full flex flex-col h-full flex-grow"
          onSubmit={handleSubmit}
        >
          {/* 이미지 */}
          <div className="flex justify-center">
            <div
              className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center mb-[30px]"
              onClick={handleImageClick}
              style={{
                backgroundImage: `url(${previewUrl || grayImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
          {/* 인풋 */}
          <div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">이름</h1>
              <input
                required
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="text"
                value={inputInfo.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">생일</h1>
              <input
                required
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="date"
                value={inputInfo.birth}
                onChange={(e) => handleChange("birth", e.target.value)}
                max={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">언어</h1>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={() => handleChange("language", "korean")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    inputInfo.language === "korean"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  한국어
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("language", "english")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    inputInfo.language === "english"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  영어
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-auto bg-pink-base w-full py-5 rounded-[10px] text-white font-semibold"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
