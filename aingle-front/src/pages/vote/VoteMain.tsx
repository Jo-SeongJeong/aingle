import { useNavigate } from "react-router-dom";
import Trophy_voteMian from "../../assets/icons/Trophy_voteMian.png";
import {
  CharacterGetPublicResponseDto,
  VoteCharacterDetail,
} from "../../model/vote";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/CustomSwiper.css";
import { useState, useEffect } from "react";
import { getVoteCharacter, getVoteCharacterDetail } from "../../api/voteAPI";

const VoteMain = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [CharacterInfo, setCharacterInfo] =
    useState<VoteCharacterDetail | null>(null);
  const getsetCharacterInfo = async (id: number) => {
    try {
      const data = await getVoteCharacterDetail(id); // API 호출
      setCharacterInfo(data); // 데이터 상태 업데이트
    } catch (error) {
      console.error("캐릭터 데이터 로드 실패: ", error);
    }
  };

  const handleBackClick = () => {
    navigate("/vote");
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  const [characters, setCharacters] =
    useState<CharacterGetPublicResponseDto | null>(null);
  const fetchCharacter = async () => {
    try {
      const data = await getVoteCharacter(); // API 호출
      setCharacters(data); // 데이터 상태 업데이트
    } catch (error) {
      console.error("캐릭터 데이터 로드 실패: ", error);
    }
  };
  useEffect(() => {
    if (selectedId != null) {
      getsetCharacterInfo(selectedId);
    }
  }, [selectedId]);
  useEffect(() => {
    fetchCharacter();
  }, []);

  return (
    <div className="bg-[#ffe8f1] h-full w-full flex flex-col">
      <div className="bg-[#ffe8f1] w-full px-[16px] pt-[34px] pb-[15px] flex flex-col items-center relative">
        <div className="w-full flex justify-between items-center mt-[24px] mb-[15px]">
          <button className="text-[#fb599a] text-lg" onClick={handleBackClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>
        <div className="bg-slate-300 w-full h-[70px] flex justify-center items-center">
          광고 받습니다
        </div>
      </div>
      <div className="bg-white w-full h-[90px] flex flex-col justify-center items-center">
        <div className="flex flex-row justify-center items-center">
          <div>
            <h1 className="text-main-color font-bold text-[20px]">
              이번 달 앵표
            </h1>
          </div>
          <div className="ml-1 mt-1">
            <img src={Trophy_voteMian} alt="" className="w-[40px]" />
          </div>
        </div>
        <div className="flex justify-center items-center mt-1 text-[#bdbdbd] text-[14px] font-semibold">
          <h1>가장 사용해 보고 싶은 캐릭터를 골라주세앵</h1>
        </div>
      </div>
      <div className="w-full h-[150px] max-w-3xl pt-8 pb-2 px-4 flex flex-col items-center">
        {characters != null && characters.allCharacterDtos.length === 0 ? (
          <p className="text-gray-500 text-lg">투표항목이 없어요</p>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={8}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {characters != null &&
              characters.allCharacterDtos.map((character, index) => (
                <SwiperSlide key={character.characterId}>
                  <div
                    onClick={() => handleSelect(character.characterId)}
                    className={`relative w-[65px] p-2 bg-white rounded-xl flex items-center justify-center shadow-md cursor-pointer ${
                      selectedId === character.characterId
                        ? "border-2 border-red-500" // 선택된 항목에 빨간색 테두리
                        : index === 0 && selectedId !== character.characterId
                        ? "border-2 border-purple-950" // 맨 앞 항목에 그라데이션 테두리
                        : ""
                    }`}
                  >
                    {index === 0 && selectedId !== character.characterId && (
                      <span className="absolute bottom-0 font-bold text-[12px] text-transparent bg-gradient-to-r from-[#5de7d3] to-[#f3b15e] bg-clip-text px-1 py-0.5 rounded-md">
                        현재 1위
                      </span>
                    )}
                    <img
                      src={character.imageUrl}
                      alt={`Character ${character.characterId}`}
                      className="w-full rounded-xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
      <div className="w-full px-4 flex flex-col justify-center items-center gap-4 relative">
        {selectedId == null ? (
          <div className="bg-white w-full h-[175px] flex rounded-2xl px-4 justify-center items-center">
            <h1 className="font-hakgyo text-main-color text-[18px]">
              캐릭터를 눌러서 확인해보세요!
            </h1>
          </div>
        ) : (
          <div className="bg-white w-full h-[175px] flex rounded-2xl px-4">
            <div className="absolute top-4 right-10 flex items-center space-x-1 text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-[18px] w-[18px] text-main-color"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>

              <span className="text-sm font-medium font-hakgyo">
                {CharacterInfo?.voteCount} 득표
              </span>
            </div>
            <div className="w-1/4 flex justify-center pt-[35px]">
              <div className="border-[1.5px] bg-white border-main-color rounded-full w-[55px] h-[55px] overflow-hidden">
                <img
                  src={CharacterInfo?.imageUrl}
                  alt="이미지 설명"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-3/4">
              <div className="h-1/3 text-[18px] pl-3 font-extrabold flex items-end">
                {CharacterInfo?.name}
              </div>
              <div className="font-bold text-main-color text-[14px] flex pt-[5px] pb-[5px] pl-3 flex-wrap">
                <div className=" mr-2">#{CharacterInfo?.age}세</div>
                <div className=" mr-2">#{CharacterInfo?.job}</div>
                <div className=" mr-2">#{CharacterInfo?.personality}</div>
                <div className=" mr-2">#{CharacterInfo?.talkType}</div>
              </div>
              <div className="pl-3 h-[60px] font-semibold text-[20px]">
                {CharacterInfo?.summary}
              </div>
              <div className="flex justify-end items-end">
                <h1 className="text-[12px] text-slate-400">
                  제작자: {CharacterInfo?.memberName}
                </h1>
              </div>
            </div>
          </div>
        )}

        <button className="bg-main-color font-semibold text-white rounded-2xl w-[200px] h-[50px]">
          투표하기
        </button>
      </div>
    </div>
  );
};

export default VoteMain;
