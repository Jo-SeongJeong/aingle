import bird from "../../assets/icons/Bird.png";
import porfile from "../../assets/images/sampleProfile.png";
import { useNavigate } from "react-router-dom";

const OnboardingResult = () => {
  const navigate = useNavigate();
  const start = async () => {
    try {
      // axios 팔로우 하기 요청

      navigate("/home");
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };
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
                  src={porfile}
                  alt="이미지 설명"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="w-3/4">
              <div className="h-2/5 text-[18px] pl-3 font-extrabold flex items-end">
                김아무개
              </div>
              <div className="h-3/5 font-bold text-main-color text-[14px] flex pt-[5px] pl-3">
                #긍정적인 #외향적인 #효율중시 #도전적인
              </div>
            </div>
          </div>

          <div className="bg-slate-300 h-[175px] w-full flex flex-row items-center justify-around">
            {/* 오른쪽 대화창 */}
            <div className="relative bg-white border-2 border-pink-500 text-pink-500 rounded-xl p-4">
              나 우울해서 빵 샀어 ㅠㅠ
              <div className="absolute right-[-20px] bottom-[10px] border-t-[10px] border-t-transparent border-l-[10px] border-l-pink-500 border-b-[10px] border-b-transparent bg-white"></div>
            </div>

            {/* 왼쪽 대화창 */}
            <div className="relative bg-pink-500 text-white rounded-xl p-4">
              무슨 빵?
              <div className="absolute left-[-20px] bottom-[10px] border-t-[10px] border-t-transparent border-r-[10px] border-r-pink-500 border-b-[10px] border-b-transparent bg-white"></div>
            </div>
          </div>

          <h1 className="mb-[16px] font-semibold text-black text-[16px]">
            이 친구와 함께 앵토피아로 떠나볼래?
          </h1>
          <button
            className="bg-main-color text-white font-semibold py-2 px-6 rounded-lg w-[156px] h-[58px]"
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
