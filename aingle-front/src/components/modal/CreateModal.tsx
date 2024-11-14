import { useState, useEffect } from "react";
import bird from "../../assets/icons/spin.gif";
import { ICharInfo } from "../../model/character";
import { useNavigate } from "react-router-dom";
import { registVote } from "../../api/voteAPI";

const CreateModal = ({age,profileImg,job,personality,tone,talkType,name,createdId}: ICharInfo) => {
  const [showBird, setShowBird] = useState(true);
  const [remainingTime, setRemainingTime] = useState(10); // 10초 카운트다운 추가

  const navigate = useNavigate();

  // 상태 메시지 변경 함수
  const getStatusMessage = (time: number) => {
    if (time > 8) return "꼼꼼하게 심사 중";
    if (time > 6) return "앵토피아 입주 하고 있앵!";
    if (time > 4) return "집 매물 알아보는중";
    if (time > 2) return "다른 친구들 만나는 중";
    return "거의 다 됐앵!";
  };
  
  useEffect(() => {
    // 0.1초마다 남은 시간 업데이트
    const interval = setInterval(() => {
      setRemainingTime((prev) => Math.max(prev - 0.1, 0));
    }, 100);

    // 10초 후에 bird 이미지를 숨기고 모달 내용을 표시
    const timer = setTimeout(() => {
      setShowBird(false);
      clearInterval(interval);
    }, 10000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  const goFeed = (id: number) => {
    navigate(`/vote/chardetail/${id}`);
  };

  const goVote = async () => {
    try {
      await registVote(createdId);
    } catch (error: any) {
      if (error.status === 409) {
        alert("투표는 한 캐릭터만 등록 가능! 이미 등록한 캐릭터가 있음");
      }
    }
    navigate("/vote/main");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-[300px] h-[430px] relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {showBird ? (
          // bird 이미지 및 카운트다운 표시
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div>
              <img src={bird} alt="Bird Icon" className="w-[60px]" />
            </div>
            <div className="mt-5 flex flex-col items-center">
              <h1 className="font-hakgyo text-main-color text-[20px]">
                {getStatusMessage(remainingTime)}
              </h1>
            </div>
          </div>
        ) : (
          // 기존 모달 내용
          <div className="w-full h-full flex flex-col items-center gap-4">
            <h1 className="text-[18px] font-semibold">생성 완료!</h1>

            <div className="flex p-[15px] gap-5 bg-[#FFE8F1] rounded-[10px] items-center">
              <div className="border-[3px] border-main-color rounded-full h-[60px] w-[60px] overflow-hidden flex-shrink-0">
                <div
                  className="w-full h-full object-cover"
                  style={{
                    backgroundImage: `url(${profileImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>

              <div>
                <h1 className="text-[18px] font-semibold">{name}</h1>
                <div className="font-bold mb-3 text-main-color text-[14px] flex items-center flex-wrap">
                  <div className="mr-2">#{age}세</div>
                  <div className="mr-2">#{job}</div>
                  <div className="mr-2">#{talkType}</div>
                  <div className="mr-2">#{personality}</div>
                  <div className="mr-2">#{tone}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#FFFAFC] rounded-[10px] p-[10px] flex flex-col gap-2 items-center">
              <h1 className="text-[16px] font-gray-2">생성한 캐릭터를</h1>
              <h1 className="text-[16px] font-gray-2">
                다른 사용자들에게 공유해볼래앵?
              </h1>
            </div>

            <div className="flex gap-3 w-full">
              <button
                className="bg-white border-[2px] box-border border-pink-500 text-pink-500 font-medium w-[50%] h-[48px] text-[16px] py-2 px-4 rounded-xl"
                onClick={() => goFeed(createdId)}
              >
                공유 안할래
              </button>
              <button
                className="bg-pink-500 text-white font-medium w-[50%] h-[48px] text-[16px] py-2 px-4 rounded-xl"
                onClick={goVote}
              >
                공유 해볼래앵
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
