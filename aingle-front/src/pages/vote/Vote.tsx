import { useState, useEffect } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import trophy from "../../assets/icons/trophy.png";
import CharacterCard from "../../components/card/CharacterCard";
import CharacterCardAdd from "../../components/card/CharacterCardAdd";
import ChDetailModal from "../../components/modal/ChDetailModal";
import { useNavigate } from "react-router-dom";
import { CharacterGetPublicResponseDto } from "../../model/vote";
import { getPrivateCharacter, getPublicCharacter } from "../../api/voteAPI";
import ReactGA from "react-ga4";
import { useRecoilValue } from "recoil";
import { userDataState } from "../../store/atoms";

const Vote = () => {
  const navigate = useNavigate();
  const userData = useRecoilValue(userDataState);

  const [characters, setCharacters] =
    useState<CharacterGetPublicResponseDto | null>(null);
  const [makedCharacters, setmakedCharacters] =
    useState<CharacterGetPublicResponseDto | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);

  // 캐릭터 데이터를 다시 가져오는 함수
  const refreshCharacters = async () => {
    try {
      const publicData = await getPublicCharacter();
      setCharacters(publicData);

      const privateData = await getPrivateCharacter();
      setmakedCharacters(privateData);
    } catch (error) {
      console.error("캐릭터 데이터 로드 실패: ", error);
    }
  };

  useEffect(() => {
    refreshCharacters(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []);

  // follow가 true인 캐릭터 수를 계산하고 GA 이벤트 전송
  useEffect(() => {
    if (characters?.allCharacterDtos) {
      const followedCount = characters.allCharacterDtos.filter(
        (char) => char.follow
      ).length;

      // GA 이벤트 전송
      ReactGA.gtag("event", "selected_character_count", {
        user_id: userData.id, // 사용자 ID
        selected_count: followedCount, // follow가 true인 캐릭터 수
      });
    }
  }, [characters, userData]);

  const placeholdersNeeded =
    (3 - ((characters?.allCharacterDtos?.length ?? 0) % 3)) % 3;
  const placeholders = Array(placeholdersNeeded).fill(null);

  const placeholdersNeeded2 = Math.max(
    3 - ((makedCharacters?.allCharacterDtos?.length ?? 0) + 1),
    0
  );
  const placeholders2 = Array(placeholdersNeeded2).fill(null);

  const openModal = (characterId: number) => {
    setSelectedCharacter(characterId);
    setModalOpen(true);
  };

  const goVoteMain = () => {
    navigate("/vote/main");
  };

  return (
    <div className="bg-[#ffe8f1] h-screen w-full px-[16px] pb-[34px] flex flex-col items-center relative overflow-scroll">
      <PinkTextHeader />
      <div className="w-full h-[110px] py-[10px] px-[5px]" onClick={goVoteMain}>
        <button className="bg-white w-full h-full rounded-2xl flex">
          <div className="w-1/4 h-full flex justify-center items-center">
            <img src={trophy} alt="" className="w-[50px] h-[50px]" />
          </div>
          <div className="w-2/4 h-full py-4">
            <div className="w-full pt-[4px] pb-[4px] flex items-start justify-start">
              <h1 className="text-[16px] text-pink-base font-semibold">
                새로운 앵표가 있앵
              </h1>
            </div>
            <div className="w-full flex items-start justify-start">
              <h1 className="text-[14px] text-[#a6a6a6] font-semibold">
                투표하러 가기
              </h1>
            </div>
          </div>
          <div className="w-1/4 h-full flex justify-end items-center px-[6px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2 transform scale-x-[-1] text-[#a6a6a6]"
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
          </div>
        </button>
      </div>
      <div className="w-full h-[60px] flex justify-center items-center">
        <div className="bg-gradient-to-r w-[154px] h-[42px] text-[18px] text-[#ffffff] font-semibold from-[#66e3cb] to-[#eabc6b] flex justify-center items-center rounded-full">
          앵토피아 주민들
        </div>
      </div>
      <div className="w-full py-3 flex justify-center items-center flex-wrap">
        {characters?.allCharacterDtos
          ? characters.allCharacterDtos.map((character, index) => (
              <CharacterCard
                key={index}
                imageUrl={character.imageUrl}
                isFollowed={character.follow}
                onClick={() => openModal(character.characterId)}
              />
            ))
          : null}
        {placeholders.map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="w-[100px] h-[100px] mx-1 my-1 opacity-0"
          />
        ))}
      </div>
      <ChDetailModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          refreshCharacters(); // 모달이 닫힐 때 데이터 다시 가져오기
        }}
        CharacterId={selectedCharacter}
      />
      <div className="w-full h-[30px] flex justify-center items-center">
        <hr className="border-pink-lighter border-t-2 w-[360px]" />
      </div>
      <div className="w-full h-[60px] flex justify-center items-center">
        <div className="bg-gradient-to-r w-[154px] h-[42px] text-[18px] text-[#ffffff] font-semibold from-[#66e3cb] to-[#eabc6b] flex justify-center items-center rounded-full">
          사용자 공유 캐릭터
        </div>
      </div>

      <div className="w-full h-[30px] flex justify-center items-center">
        <hr className="border-pink-lighter border-t-2 w-[360px]" />
      </div>
      {/* 내가 만든 캐릭터 */}
      <div className="w-full h-[125px] py-3 mb-[100px]">
        <div className="px-5 pb-2">
          <h1 className="text-main-color text-[13px] font-semibold">
            캐릭터는 최대 3개까지 생성할 수 있앵
          </h1>
        </div>
        <div className="w-full flex justify-center items-center flex-wrap">
          {makedCharacters?.allCharacterDtos.map((character, index) => (
            <CharacterCard
              key={index}
              imageUrl={character.imageUrl}
              isFollowed={character.follow}
              onClick={() => openModal(character.characterId)}
            />
          ))}
          {(makedCharacters?.allCharacterDtos?.length ?? 0) < 3 && (
            <CharacterCardAdd />
          )}
          {placeholders2.map((_, index) => (
            <div
              key={`placeholder-${index}`}
              className="w-[100px] h-[100px] mx-1 my-1 opacity-0"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Vote;
