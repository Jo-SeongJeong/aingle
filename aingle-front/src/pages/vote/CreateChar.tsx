import TextHeader from "../../components/header/TextHeader";
import React, { useRef, useState } from "react";
import grayImg from "../../assets/images/grayImg.png";
import add from "../../assets/icons/options/add.png";
import sub from "../../assets/icons/options/sub.png";

const CreateChar = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(20);
  const [profileImg, setProfileImg] = useState(grayImg); // 기본값을 grayImg로 설정
  const [job, setJob] = useState("");
  const [personality, setPersonality] = useState("");
  const [etc, setEtc] = useState<string[]>([""]);
  const [tone, setTone] = useState("반말");
  const [talktype, setTalktype] = useState("투머치토커");

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL을 저장할 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지 파일을 저장할 상태
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력을 참조할 ref

  const handleImageClick = () => {
    fileInputRef.current?.click(); // 이미지 디브 클릭 시 파일 입력 클릭
  };

  const handleAddEtc = () => {
    setEtc([...etc, ""]); // 새로운 빈 항목 추가
  };

  const handleRemoveEtc = (index: number) => {
    setEtc(etc.filter((_, i) => i !== index)); // 해당 항목 삭제
  };

  const handleEtcChange = (index: number, value: string) => {
    const updatedEtc = [...etc];
    updatedEtc[index] = value;
    setEtc(updatedEtc);
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
                backgroundImage: `url(${previewUrl || grayImg})`, // 미리보기 URL 또는 기본 이미지 설정
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
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="text"
                placeholder="예) 안성재"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">직업</h1>
              <input
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="text"
                placeholder="예) 요리사"
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">나이</h1>
              <input
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="number"
                placeholder="예) 30"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">말투</h1>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setTone("반말")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    tone === "반말"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  반말
                </button>
                <button
                  type="button"
                  onClick={() => setTone("존댓말")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    tone === "존댓말"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  존댓말
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">성격</h1>
              <input
                className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                type="text"
                value={personality}
                placeholder="예) 긍정, 부정, 사춘기, 츤데레 등"
                onChange={(e) => setPersonality(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">말</h1>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setTalktype("투머치토커")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    talktype === "투머치토커"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  투머치토커
                </button>
                <button
                  type="button"
                  onClick={() => setTalktype("간결하게")}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    talktype === "간결하게"
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  간결하게
                </button>
              </div>
            </div>

            {/* 기타 */}
            <div>
              {/* 기타 입력 필드 */}
              {etc.map((item, index) => (
                <div className="flex items-center mb-[15px]" key={index}>
                  <h1 className="text-gray-700 text-[14px] min-w-[30px] mr-4">
                    기타
                  </h1>
                  <input
                    className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                    type="text"
                    placeholder="ex) even이라는 말을 자주 사용한다."
                    value={item}
                    onChange={(e) => handleEtcChange(index, e.target.value)}
                  />
                  <img
                    src={sub}
                    className="w-6 h-6 ml-1.5 cursor-pointer"
                    onClick={() => handleRemoveEtc(index)}
                    alt="remove"
                  />
                </div>
              ))}
              <div className="flex mb-2">
                <span>항목 추가</span>
                <img
                  src={add}
                  className="w-6 h-6 ml-1.5 cursor-pointer"
                  onClick={handleAddEtc}
                  alt="add"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="mt-auto  bg-pink-base w-full py-5 rounded-[10px] text-white font-semibold"
          >
            수정하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChar;
