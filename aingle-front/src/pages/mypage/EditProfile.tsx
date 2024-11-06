import React, { useEffect, useRef, useState } from "react";
import TextHeader from "../../components/header/TextHeader";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataState } from "../../store/atoms";
import { ImemberUpdateRequestDto } from "../../model/user";
import { patchUserInfo } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
  
  // 유저 정보 상태관리
  const userInfo = useRecoilValue(userDataState);
  const setUserData = useSetRecoilState(userDataState);

  // 유저 정보 수정 이후 마이페이지로 리다이렉트 시킬 navigate
  const navigate = useNavigate();

  // 유저 정보 수정 api 요청 할 때 인수로 사용할 객체 생성
  const [updateInfo, setUpdateInfo] = useState<ImemberUpdateRequestDto>({
    name: userInfo.name,
    birth: userInfo.birth,
    language: userInfo.language,
    file: userInfo.memberImage,
  });
  console.log(updateInfo);
  // 유저 사진 상태관리
  const [profileImg, setProfileImg] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);  
  const fileInputRef = useRef<HTMLInputElement | null>(null); 

  //이 코드는 나중에 지움
useEffect(() => {
  if (userInfo.file) {
    setPreviewUrl(userInfo.file);
  } else {
    setProfileImg("");
  }
}, [userInfo]);

  // 값 변경때 사용하는 함수
  const handleChange = (
    field: keyof ImemberUpdateRequestDto,
    value: string | File | null
  ) => {
    setUpdateInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 디브 클릭 시 파일 입력 클릭
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleChange("file" , file); // 선택한 파일을 상태에 저장
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewUrl(reader.result); // 미리보기 URL을 상태에 저장
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await patchUserInfo(updateInfo);
  
      // 정보 수정 이후 발급된 토큰을 새로 세션 스토리지에 저장 
      sessionStorage.setItem("accessToken", response.token);
      const decoded = jwtDecode(response.token);
      setUserData(decoded);
       

      // 회원가입 이후 메인 페이지로 리다이렉트
      navigate("/mypage");

    } catch (error) {
      console.error("회원 정보 수정 실패 : " , error);
    }
  };

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
                backgroundImage: `url(${userInfo.memberImage})`,
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
                value={updateInfo.name}
                onChange={(e) => {
                  handleChange("name", e.target.value);
                }}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">생일</h1>
              <input
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="date"
                value={updateInfo.birth}
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
                    updateInfo.language === "korean"
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
                    updateInfo.language === "english"
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
