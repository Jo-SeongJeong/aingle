import React, { useRef, useState } from "react";
import TextHeader from "../../components/header/TextHeader";
import grayImg from "../../assets/images/grayImg.png";
import { ImemberSignUpRequestDto } from "../../model/user.ts";
import { useLocation } from "react-router-dom";
import { registUserInfo } from "../../api/userAPI.ts";


const Signup = () => {
  const location = useLocation();

  // SocialRedirection에서 받은 platform 정보
  const platform = location.state.method;
  // sessionStorage에 저장된 eamil 정보
  const email = sessionStorage.getItem("email")!;

  const [inputInfo, setInputInfo] = useState<ImemberSignUpRequestDto>({
    name: "",
    email: email,
    birth: "",
    platform: platform,
    language: "korean",
    file: null,
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    // 폼 제출 막기
    e.preventDefault();
    if (!inputInfo.file) {
      // 파일이 없으면 경고 표시
      alert("프로필 이미지를 선택해주세요.");
      return;
    }
    // 디버깅용 출력문
    console.log(inputInfo);

    // 회원가입 요청 보내기
    registUserInfo(inputInfo);
  };

  return (
    <div className="h-full w-[375px] relative bg-white overflow-auto">
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
