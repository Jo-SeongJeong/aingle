import { useEffect } from "react";
import bird from "../../assets/icons/Bird.png";
import { useNavigate, useLocation } from "react-router-dom";
import { CharacterInfoShort } from "../../model/character";
import talk01 from "../../assets/images/talk01.png";
import talk02 from "../../assets/images/talk02.png";
import talk03 from "../../assets/images/talk03.png";
import talk04 from "../../assets/images/talk04.png";
import talk05 from "../../assets/images/talk05.png";
import talk06 from "../../assets/images/talk06.png";
import { useRecoilState } from "recoil";
import { characterIdState } from "../../store/atoms";

const OnboardingResult = () => {
  const location = useLocation();
  const surveyResult = location.state as CharacterInfoShort; // 전달받은 데이터
  const navigate = useNavigate();
  const [recommendID, setRecommendId] = useRecoilState(characterIdState);
  const start = async () => {
    try {
      setRecommendId(surveyResult.characterId);
      navigate("/login");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    return () => {
      // 로컬 스토리지에서 정보 꺼내기
    };
  }, []);

  return (
    <div className="bg-white h-full w-full px-[16px] py-[34px] flex flex-col  items-center">
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="flex items-center justify-center flex-col h-full">
          <img src={bird} className="w-[60px] h-[60px] mb-6" />
          <div className="mb-[26px]">
            <span className="font-hakgyo font-bold text-[20px] text-black ">
              너에게 딱 맞는 친구는
            </span>
          </div>
          <div className="bg-[#ffe8f1] w-[300px] h-[105px] flex rounded-2xl px-4">
            <div className="w-1/4 flex justify-center pt-[19px]">
              <div className="border-[1.5px] bg-white border-main-color rounded-full w-[55px] h-[55px] overflow-hidden">
                <img
                  src={surveyResult.imageUrl}
                  alt="이미지 설명"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-3/4">
              <div className="h-2/5 text-[18px] pl-3 font-extrabold flex items-end">
                {surveyResult.name}
              </div>
              <div className="font-bold text-main-color text-[14px] flex pt-[5px] pl-3 flex-wrap">
                <div className=" mr-2">#{surveyResult.age}세</div>
                <div className=" mr-2">#{surveyResult.job}</div>
                <div className=" mr-2">
                  #
                  {surveyResult.talkType
                    ? "TMI 투머치 토커"
                    : "조용하고 소심한"}
                </div>
                <div className=" mr-2">
                  #{surveyResult.tone ? "반말모드" : "예의바른"}
                </div>
              </div>
            </div>
          </div>

          <div className="h-[175px] w-full flex flex-row items-center justify-around">
            {surveyResult.characterId === 1 && (
              <img src={talk01} alt="" className="w-[300px]" />
            )}
            {surveyResult.characterId === 2 && (
              <img src={talk02} alt="" className="w-[300px]" />
            )}
            {surveyResult.characterId === 3 && (
              <img src={talk03} alt="" className="w-[300px]" />
            )}
            {surveyResult.characterId === 4 && (
              <img src={talk04} alt="" className="w-[300px]" />
            )}
            {surveyResult.characterId === 5 && (
              <img src={talk05} alt="" className="w-[300px]" />
            )}
            {surveyResult.characterId === 6 && (
              <img src={talk06} alt="" className="w-[300px]" />
            )}

            {/* <div className="relative bg-white border-2 border-pink-500 text-pink-500 rounded-xl p-4">
              나 우울해서 빵 샀어 ㅠㅠ
              <div className="absolute right-[-20px] bottom-[10px] border-t-[10px] border-t-transparent border-l-[10px] border-l-pink-500 border-b-[10px] border-b-transparent bg-white"></div>
            </div>

            <div className="relative bg-pink-500 text-white rounded-xl p-4">
              무슨 빵?
              <div className="absolute left-[-20px] bottom-[10px] border-t-[10px] border-t-transparent border-r-[10px] border-r-pink-500 border-b-[10px] border-b-transparent bg-white"></div>
            </div> */}
          </div>

          <h1 className="mb-[16px] font-semibold text-black text-[16px]">
            이 친구와 함께 앵토피아로 떠나볼래?
          </h1>
          <button
            className="bg-main-color text-white font-semibold py-2 px-6 rounded-lg w-[156px] h-[58px] my-4"
            onClick={start}
          >
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingResult;
