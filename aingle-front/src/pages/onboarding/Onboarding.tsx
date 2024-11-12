import { useEffect, useState } from "react";
import bird from "../../assets/icons/Bird.png";
import { useNavigate } from "react-router-dom";
import SurveyElementButton from "../../components/button/SurveyElementButton";
import { useRecoilState } from "recoil";
import { characterIdState } from "../../store/atoms";

const Onboarding = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [selected, setSelected] = useState<{ [key: number]: number }>({
    1: -1,
    2: -1,
    3: -1,
    4: -1,
  });
  const navigate = useNavigate();
  const [recommendID, setRecommendId] = useRecoilState(characterIdState);
  // 선택된 버튼을 업데이트하는 함수
  const handleSelect = (questionNumber: number, buttonNumber: number) => {
    setSelected((prev) => ({
      ...prev,
      [questionNumber]: buttonNumber,
    }));
  };

  useEffect(() => {}, [selected]);

  // 뒤로가기 버튼 클릭 시 페이지 감소
  const handleBackClick = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // 버튼 클릭 시 페이지 번호 증가 및 마지막 페이지 도달 시 onLastPageReached 호출
  const handleButtonClick = () => {
    if (pageNumber != 1 && selected[pageNumber - 1] === -1) {
      alert("선택을 완료해주세요!");
      return;
    }

    // 선택되었으면 페이지 넘김
    if (pageNumber < 5) {
      setPageNumber(pageNumber + 1);
    } else {
      onLastPageReached();
    }
  };

  // 마지막 페이지 도달 시 실행되는 함수
  const onLastPageReached = async () => {
    try {
      for (let i = 1; i <= 4; i++) {
        localStorage.setItem(String(i), String(selected[i]));
      }
      navigate("/loading");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  // 프로그레스 바 컴포넌트 (2번부터 5번까지 표시)
  const ProgressBar = () => {
    const progress = ((pageNumber - 1) / 4) * 100;
    return (
      <div className="w-full h-[8px] bg-gray-300 rounded-full mb-[63px]">
        <div
          className="h-full bg-pink-base rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>
    );
  };

  const skip = () => {
    setRecommendId(6);
    navigate("/login");
  };

  // 페이지별 컨텐츠 렌더링
  const renderContent = () => {
    switch (pageNumber) {
      case 1:
        return (
          <div className="flex items-center justify-center flex-col h-full">
            {" "}
            {/* 가운데 정렬 */}
            <img src={bird} className="w-[60px] h-[60px] mb-6" />
            <div className="mb-[34px]">
              <span className="font-hakgyo text-[26px] text-pink-base">
                aingle{" "}
              </span>
              <span className="font-hakgyo text-[26px] text-black ">
                에 온 걸 환영해!
              </span>
            </div>
            <h1 className="mb-[16px] font-hakgyo text-black">
              너에게 딱 맞는 AI캐릭터를 추천해주려고 해
            </h1>
            <h1 className="mb-[16px] font-hakgyo text-black">
              너가 어떤 사람인지 알려줘
            </h1>
            <h1 className="mb-[16px] font-hakgyo text-black">
              그러면 내가 맞는 친구를 데려올게
            </h1>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center mt-20 flex-col h-full">
            <h1 className="mb-[16px] font-hakgyo text-[#fb599a] text-[32px]">
              Q1
            </h1>
            <h1 className="mb-[50px] font-hakgyo text-black">
              SNS에서 주로 어떻게 시간을 보내시나요?
            </h1>
            <SurveyElementButton
              button1Text="주기적으로 게시글을 올리고 활발하게 소통한다"
              button2Text="다른 사람들의 게시물을 관찰하는 시간이 더 많다"
              chosed={selected[pageNumber - 1]}
              onSelect={(buttonNumber) =>
                handleSelect(pageNumber - 1, buttonNumber)
              }
            />
          </div>
        );
      case 3:
        return (
          <div className="flex items-center mt-20 flex-col h-full">
            <h1 className="mb-[16px] font-hakgyo text-[#fb599a] text-[32px]">
              Q2
            </h1>
            <h1 className="mb-[50px] font-hakgyo text-black">
              SNS에서 어떤 콘텐츠를 더 자주 클릭하시나요?
            </h1>
            <SurveyElementButton
              button1Text="정보나 유용한 팁을 주로 클릭한다"
              button2Text="흥미로운 릴스나 자극적인 콘텐츠를 주로 클릭한다"
              chosed={selected[pageNumber - 1]}
              onSelect={(buttonNumber) =>
                handleSelect(pageNumber - 1, buttonNumber)
              }
            />
          </div>
        );
      case 4:
        return (
          <div className="flex items-center mt-20 flex-col h-full">
            <h1 className="mb-[16px] font-hakgyo text-[#fb599a] text-[32px]">
              Q3
            </h1>
            <h1 className="mb-[8px] font-hakgyo text-black">
              친구가 SNS에 고민을 털어놓았을 때,
            </h1>
            <h1 className="mb-[20px] font-hakgyo text-black">
              어떻게 반응하시나요?
            </h1>
            <SurveyElementButton
              button1Text="도움될 만한 해결책을 이야기한다"
              button2Text="친구의 감정을 먼저 이해하고 공감의 말을 건넨다"
              chosed={selected[pageNumber - 1]}
              onSelect={(buttonNumber) =>
                handleSelect(pageNumber - 1, buttonNumber)
              }
            />
          </div>
        );
      case 5:
        return (
          <div className="flex items-center mt-20 flex-col h-full">
            <h1 className="mb-[16px] font-hakgyo text-[#fb599a] text-[32px]">
              Q4
            </h1>
            <h1 className="mb-[50px] font-hakgyo text-black">
              SNS 피드를 관리하는 방식은 어떤가요?
            </h1>
            <SurveyElementButton
              button1Text="정기적으로 정리하며 깔끔하게 유지한다"
              button2Text="필요에 따라 변경하고, 크게 신경 쓰지 않는다"
              chosed={selected[pageNumber - 1]}
              onSelect={(buttonNumber) =>
                handleSelect(pageNumber - 1, buttonNumber)
              }
            />
          </div>
        );
      default:
        return <div></div>;
    }
  };

  // 버튼 텍스트 결정
  const buttonText = () => {
    switch (pageNumber) {
      case 1:
        return "시작하기";
      case 2:
        return "다음으로";
      case 3:
        return "다음으로";
      case 4:
        return "다음으로";
      case 5:
        return "시작하기";
      default:
        return "시작하기";
    }
  };

  return (
    <div className="bg-[#FFFAFC] h-[100vh] w-full px-[16px] py-[34px] flex flex-col justify-between items-center">
      {/* 첫 화면이 아닐 경우에만 뒤로가기 버튼을 표시 */}
      {pageNumber > 1 && (
        <div className="w-full flex justify-between items-center mb-[12px]">
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
      )}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* 첫 화면에는 프로그레스 바가 없고 2번부터 표시 */}
        {pageNumber > 1 && <ProgressBar />}
        {renderContent()}
      </div>

      {/* 하단 버튼, 스킵 */}
      <div className="absolute bottom-6 w-full left-[23px] ">
        {pageNumber === 1 && (
          <div
            className="flex max-w-[436px] w-full px-2 justify-end items-end"
            style={{ width: `calc(100% - 46px)` }}
          >
            <h1
              className="text-3 text-[#91919C] underline cursor-pointer mb-3"
              onClick={skip}
            >
              건너뛰기
            </h1>
          </div>
        )}
        <button
          className={`w-full  mt-auto bg-pink-base  py-5 rounded-[10px] text-white text-4 font-semibold self-end ${
            pageNumber === 1 ? "mt-[10px]" : "mt-[80px]"
          }`}
          style={{ width: `calc(100% - 46px)` }}
          onClick={handleButtonClick}
        >
          {buttonText()}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
