import React, { useRef, useState } from "react";
import TextHeader from "../../components/header/TextHeader";
import grayImg from "../../assets/images/grayImg.png";

const EditProfile = () => {
  const [birthday, setBirthday] = useState("2000-01-01");
  const [userName, setUserName] = useState("정채린");
  const [language, setLanguage] = useState("한국어");
  const [profileImg, setProfileImg] = useState("");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL을 저장할 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지 파일을 저장할 상태
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력을 참조할 ref

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 디브 클릭 시 파일 입력 클릭
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file); // 선택한 파일을 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result); // 미리보기 URL을 상태에 저장
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {};

  return (
    <div className="h-full w-[375px] relative bg-white overflow-auto">
      <TextHeader navTo={"/mypage"} headerText={"프로필 편집"} />
      <div className="flex flex-col h-full pt-[54px] pb-6 px-[23px] items-center">
        <form className="mt-[30px] w-full flex flex-col h-full flex-grow">
          {/* 이미지 */}
          <div className="flex justify-center">
            <div
              className="w-[100px] h-[100px]  rounded-full bg-gray-200 flex items-center mb-[30px]"
              onClick={handleImageClick}
              style={{
                backgroundImage: `url(${profileImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {" "}
              {!previewUrl && (
                <>
                  <img src={profileImg} className="w-[30px] h-[30px]" />
                </>
              )}
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
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">생일</h1>
              <input
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="date"
                value={birthday}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">언어</h1>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={() => handleLanguageChange("한국어")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    language === "한국어"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  한국어
                </button>
                <button
                  type="button"
                  onClick={() => handleLanguageChange("영어")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    language === "영어"
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
            onClick={handleSubmit}
            className="mt-auto bg-pink-base w-full py-5 rounded-[10px] text-white font-semibold"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
