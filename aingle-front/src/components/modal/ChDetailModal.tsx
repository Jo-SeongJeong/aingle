import { CharacterInfo } from "../../model/character";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  deleteCharacter,
  getCharacterDetail,
  registVote,
} from "../../api/voteAPI";

interface ChDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  CharacterId: number;
  isPublic: boolean;
}
const ChDetailModal: React.FC<ChDetailModalProps> = ({
  isOpen,
  onClose,
  CharacterId,
  isPublic,
}) => {
  const goVote = async () => {
    try {
      await registVote(CharacterId);
    } catch (error: any) {
      if (error.status === 409) {
        alert("투표는 한 캐릭터만 등록 가능! 이미 등록한 캐릭터가 있음");
        navigate("/vote");
      } else if (error.status === 500) {
        alert("이미 공유한 캐릭터야! 캐릭터는 한 개만 공유 가능해!");
        navigate("/vote/main");
      }
    }
  };

  if (!isOpen || !CharacterId) return null;
  const navigate = useNavigate();
  const goFeed = (id: number) => {
    navigate(`/vote/chardetail/${id}`);
  };
  const [CharacterInfo, setCharacterInfo] = useState<CharacterInfo | null>(
    null
  );
  const getsetCharacterInfo = async () => {
    try {
      const data = await getCharacterDetail(CharacterId); // API 호출
      setCharacterInfo(data); // 데이터 상태 업데이트
    } catch (error) {
      console.error("캐릭터 데이터 로드 실패: ", error);
    }
  };
  useEffect(() => {
    getsetCharacterInfo();
  }, []);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-[300px] h-[399px] relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          <div className="border-[3px] border-main-color rounded-full h-[100px] w-[100px] overflow-hidden">
            <img
              src={CharacterInfo?.imageUrl}
              alt="Character"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full h-[150px] flex flex-col items-center justify-center rounded-lg">
            <div className="h-1/6 w-full flex justify-center items-center font-hakgyo text-[22px]">
              <h1 className="">{CharacterInfo?.name}</h1>
            </div>
            <div className="h-2/6 font-bold mb-3 text-main-color text-[14px] flex items-center justify-center pt-[5px] pl-3 flex-wrap">
              <div className=" mr-2">#{CharacterInfo?.age}세</div>
              <div className=" mr-2">#{CharacterInfo?.job}</div>
              <div className=" mr-2">
                #
                {CharacterInfo?.talkType
                  ? "TMI 투머치 토커"
                  : "조용하고 소심한"}
              </div>
              <div className=" mr-2">
                #{CharacterInfo?.tone ? "반말모드" : "예의바른"}
              </div>
            </div>
            <div className="w-full h-3/6 text-center bg-pink-50 rounded-xl flex items-center justify-center text-gray-500 text-lg font-medium px-10">
              {CharacterInfo?.summary}
            </div>
          </div>
          <button
            onClick={() => goFeed(CharacterInfo?.characterId ?? 0)}
            className="bg-pink-500 text-white font-medium w-[145px] h-[48px] text-[16px] py-2 px-4 rounded-xl"
          >
            피드 보러 가기 &gt;
          </button>
        </div>
        {!isPublic && (
          <>
            <h1
              onClick={goVote}
              className="text-2 text-[#91919C] underline text-right absolute left-6 bottom-4"
            >
              공유
            </h1>
            <h1
              onClick={() => {
                deleteCharacter(CharacterId);
                onClose();
              }}
              className="text-2 text-[#91919C] underline text-right absolute right-6 bottom-4"
            >
              삭제
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default ChDetailModal;
