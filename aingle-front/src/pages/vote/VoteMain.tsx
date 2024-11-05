import { useNavigate } from "react-router-dom";
import Trophy_voteMian from "../../assets/icons/Trophy_voteMian.png";
import { slider } from "../../model/vote";
import bird from "../../assets/icons/Bird.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../../styles/CustomSwiper.css"; // Swiper 점 위치 조정을 위한 커스텀 CSS
import { useState } from "react";

const VoteMain = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleBackClick = () => {
    navigate("/vote");
  };

  const handleSelect = (id: number) => {
    setSelectedId(id);
  };

  // characters 배열 정의
  const characters: slider[] = [
    { id: 1, imageUrl: bird },
    { id: 2, imageUrl: bird },
    { id: 3, imageUrl: bird },
    { id: 4, imageUrl: bird },
    { id: 5, imageUrl: bird },
    { id: 6, imageUrl: bird },
    { id: 7, imageUrl: bird },
    { id: 8, imageUrl: bird },
  ];

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
        {characters.length === 0 ? (
          <p className="text-gray-500 text-lg">투표항목이 없어요</p>
        ) : (
          <Swiper
            slidesPerView={4}
            spaceBetween={8}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-full"
          >
            {characters.map((character, index) => (
              <SwiperSlide key={character.id}>
                <div
                  onClick={() => handleSelect(character.id)}
                  className={`relative w-[65px] p-2 bg-white rounded-xl flex items-center justify-center shadow-md cursor-pointer ${
                    selectedId === character.id
                      ? "border-2 border-red-500" // 선택된 항목에 빨간색 테두리
                      : index === 0 && selectedId !== character.id
                      ? "border-2 border-purple-950" // 맨 앞 항목에 그라데이션 테두리
                      : ""
                  }`}
                >
                  {index === 0 && selectedId !== character.id && (
                    <span className="absolute bottom-0 font-bold text-[12px] text-transparent bg-gradient-to-r from-[#5de7d3] to-[#f3b15e] bg-clip-text px-1 py-0.5 rounded-md">
                      현재 1위
                    </span>
                  )}
                  <img
                    src={character.imageUrl}
                    alt={`Character ${character.id}`}
                    className="w-full rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <div className="w-full px-4 flex flex-col justify-center items-center gap-4 relative">
        <div className="absolute top-4 right-10 flex items-center space-x-1 text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm font-medium">22 득표</span>
        </div>

        <div className="bg-white w-full h-[175px] flex rounded-2xl px-4">
          <div className="w-1/4 flex justify-center pt-[40px]">
            <div className="border-[1.5px] bg-white border-main-color rounded-full w-[55px] h-[55px] overflow-hidden">
              <img
                src={bird}
                alt="이미지 설명"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="w-3/4">
            <div className="h-2/5 text-[18px] pl-3 font-extrabold flex items-end">
              홀슨맨
            </div>
            <div className="font-bold text-main-color text-[14px] flex pt-[5px] pl-3 flex-wrap">
              <div className=" mr-2">#28세</div>
              <div className=" mr-2">#게임개발자</div>
              <div className=" mr-2">
                #{true ? "TMI 투머치 토커" : "조용하고 소심한"}
              </div>
              <div className=" mr-2">#{true ? "반말모드" : "예의바른"}</div>
            </div>
            <div>흠,,, 나를 투표하겠다고? 흥미롭군,,,</div>
          </div>
        </div>
        <button className="bg-main-color font-semibold text-white rounded-2xl w-[200px] h-[50px]">
          투표하기
        </button>
      </div>
    </div>
  );
};

export default VoteMain;
