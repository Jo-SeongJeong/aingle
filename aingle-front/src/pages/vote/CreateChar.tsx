import TextHeader from "../../components/header/TextHeader";
import React, { useRef, useState } from "react";
import grayImg from "../../assets/images/grayImg.png";
import add from "../../assets/icons/options/add.png";
import sub from "../../assets/icons/options/sub.png";
import CreateModal from "../../components/modal/CreateModal";
import ShareModal from "../../components/modal/ShareModal";
import { createCharacter } from "../../api/voteAPI";
import { CreateCharacter } from "../../model/character";
import { followBot } from "../../api/followAPI";

const CreateChar = () => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(20);
  const [job, setJob] = useState("");
  const [personality, setPersonality] = useState("");
  const [etc, setEtc] = useState<string[]>([""]);
  const [tone, setTone] = useState("반말");
  const [talktype, setTalktype] = useState("투머치토커");
  const [gender, setGender] = useState(true);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // 미리보기 URL을 저장할 상태
  const [selectedImage, setSelectedImage] = useState<File | null>(null); // 이미지 파일을 저장할 상태
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 파일 입력을 참조할 ref

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [createdId, setCreatedId] = useState<number>(-1);
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

  const handleAddEtc = () => {
    if (etc.length > 2) {
      alert("최대 3개까지 입력 가능합니다!");
      return;
    }
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

  const create = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필수 항목 체크
    if (!userName || !job || !age || !personality || !selectedImage) {
      alert("모든 필수 항목을 입력해 주세요!");
      return;
    }

    const characterInfo: CreateCharacter = {
      characterCreateRequest: {
        name: userName,
        job,
        age,
        tone: tone === "존댓말",
        personality,
        talkType: talktype === "간결하게",
        description: etc,
        gender: gender,
      },
      file: selectedImage,
    };

    setIsCreateModalOpen(true);
    console.log(characterInfo);
    try {
      const data = await createCharacter(characterInfo);
      setCreatedId(data.characterId);
      // followBot(data.characterId);
    } catch (error) {
      console.log("캐릭터 등록 실패");
    }
  };

  return (
    <div className="min-h-screen relative bg-white overflow-auto">
      {isCreateModalOpen && (
        <CreateModal
          name={userName}
          profileImg={previewUrl || grayImg}
          age={age}
          job={job}
          personality={personality}
          talkType={talktype}
          tone={tone}
          userName={userName}
          createdId={createdId}
        />
      )}
      {isShareModalOpen && (
        <ShareModal onClose={() => setIsShareModalOpen(false)} />
      )}
      <TextHeader navTo={-1} headerText={"캐릭터 등록"} />
      <div className="flex flex-col h-full mb-10 pt-[54px] pb-6 px-[23px] items-center">
        <form
          className="mt-[30px] w-full flex flex-col h-full flex-grow"
          onSubmit={create}
        >
          {/* 이미지 */}
          <div className="flex justify-center">
            <div
              className="w-[100px] h-[100px] rounded-full bg-gray-200 flex items-center mb-[30px] cursor-pointer"
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
          {/* 인풋 필드 */}
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
                maxLength={15}
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
            <div className="flex items-center gap-4 mb-[15px]">
              <h1 className="text-gray-700 text-[14px] min-w-[30px]">성별</h1>
              <div className="flex gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setGender(true)}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    gender === true
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  남자
                </button>
                <button
                  type="button"
                  onClick={() => setGender(false)}
                  className={`px-4 py-2 rounded-[10px] flex-grow ${
                    gender === false
                      ? "bg-pink-100 text-pink-500 border border-pink-500"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  여자
                </button>
              </div>
            </div>
            {/* 기타 항목 */}
            <div>
              {etc.map((item, index) => (
                <div className="flex items-center mb-[15px]" key={index}>
                  <h1 className="text-gray-700 text-[14px] min-w-[30px] mr-4">
                    기타
                  </h1>
                  <input
                    className="py-3 px-[22px] border-[1px] border-[#CACDD2] rounded-[10px] flex-grow"
                    type="text"
                    placeholder="ex) even이라는 말을 자주 사용"
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
                <span>기타 항목 추가 (최대 3개)</span>
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
            className="mt-auto bg-pink-base w-full py-5 rounded-[10px] text-white font-semibold"
          >
            등록하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateChar;
