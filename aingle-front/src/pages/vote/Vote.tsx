import { useState } from "react";
import PinkTextHeader from "../../components/header/PinkTextHeader";
import trophy from "../../assets/icons/trophy.png";
import CharacterCard from "../../components/card/CharacterCard";
import CharacterCardAdd from "../../components/card/CharacterCardAdd";
import ChDetailModal from "../../components/modal/ChDetailModal";
import { CharacterInfo } from "../../model/character";

const Vote = () => {
  const characters: CharacterInfo[] = [
    {
      characterId: 1,
      name: "John",
      job: "Warrior",
      age: 25,
      tone: true,
      personality: "Brave",
      talkType: true,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: true,
    },
    {
      characterId: 2,
      name: "Sarah",
      job: "Mage",
      age: 30,
      tone: false,
      personality: "Wise",
      talkType: false,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: false,
    },
    {
      characterId: 3,
      name: "Leo",
      job: "Archer",
      age: 22,
      tone: true,
      personality: "Energetic",
      talkType: false,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: false,
    },
    {
      characterId: 4,
      name: "Mia",
      job: "Assassin",
      age: 27,
      tone: true,
      personality: "Calm",
      talkType: true,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: true,
    },
    {
      characterId: 5,
      name: "Alex",
      job: "Knight",
      age: 35,
      tone: false,
      personality: "Honest",
      talkType: true,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: true,
    },
    {
      characterId: 6,
      name: "Emma",
      job: "Druid",
      age: 29,
      tone: true,
      personality: "Kind",
      talkType: false,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: false,
    },
    {
      characterId: 7,
      name: "Max",
      job: "Thief",
      age: 24,
      tone: true,
      personality: "Cunning",
      talkType: true,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: true,
    },
    {
      characterId: 8,
      name: "Luna",
      job: "Sorcerer",
      age: 28,
      tone: false,
      personality: "Mysterious",
      talkType: true,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: true,
    },
  ];

  const makedCharacters: CharacterInfo[] = [
    {
      characterId: 1,
      name: "Unknown",
      job: "Unknown",
      age: 0,
      tone: false,
      personality: "Unknown",
      talkType: false,
      etc: {},
      imageUrl:
        "https://plog-bucket-official.s3.ap-northeast-2.amazonaws.com/horseman.png",
      isFollowed: false,
    },
  ];

  const placeholdersNeeded = (3 - (characters.length % 3)) % 3;
  const placeholders = Array(placeholdersNeeded).fill(null);

  const placeholdersNeeded2 = Math.max(3 - (makedCharacters.length + 1), 0);
  const placeholders2 = Array(placeholdersNeeded2).fill(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterInfo | null>(null);

  const openModal = (character: CharacterInfo) => {
    setSelectedCharacter(character);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#ffe8f1] h-full w-full px-[16px] py-[34px] flex flex-col items-center relative overflow-scroll">
      <PinkTextHeader />
      <div className="w-full h-[110px] py-[10px] px-[5px]">
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
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            imageUrl={character.imageUrl}
            isFollowed={character.isFollowed}
            onClick={() => openModal(character)}
          />
        ))}
        {placeholders.map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="w-[100px] h-[100px] mx-1 my-1 opacity-0"
          />
        ))}
      </div>
      <ChDetailModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        CharacterInfo={selectedCharacter}
      />
      <div className="w-full h-[30px] flex justify-center items-center">
        <hr className="border-[#6a6a6a] border-t-2 w-[300px]" />
      </div>
      <div className="w-full h-[125px] py-3 mb-[100px]">
        <div className="px-5 pb-2">
          <h1 className="text-main-color text-[13px] font-semibold">
            캐릭터는 최대 3개까지 생성할 수 있앵
          </h1>
        </div>
        <div className="w-full flex justify-center items-center flex-wrap">
          {makedCharacters.map((character, index) => (
            <CharacterCard
              key={index}
              imageUrl={character.imageUrl}
              isFollowed={character.isFollowed}
              onClick={() => openModal(character)}
            />
          ))}
          {makedCharacters.length < 3 && <CharacterCardAdd />}
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
