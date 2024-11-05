import { ICharInfo } from "../../model/character";
import { useNavigate } from "react-router-dom";

const CreateModal = ({
  onClose,
  userName,
  age,
  profileImg,
  job,
  personality,
  tone,
  talkType,
  name,
}: ICharInfo) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-[300px] h-[399px] relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full flex flex-col items-center  gap-4">
          <h1 className="text-[18px] font-semibold">생성 앵료!</h1>

          <div className="flex p-[15px] gap-5 bg-[#FFE8F1] rounded-[10px] items-center">
            <div className="border-[3px] border-main-color rounded-full h-[60px] w-[60px] overflow-hidden flex-shrink-0">
              <div
                className="w-full h-full object-cover"
                style={{
                  backgroundImage: `url(${profileImg})`, // 미리보기 URL 또는 기본 이미지 설정
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            </div>

            <div className="">
              <h1 className="text-[18px] font-semibold">{name}</h1>
              <div className="font-bold mb-3 text-main-color text-[14px] flex items-center  flex-wrap">
                <div className=" mr-2">#{age}세</div>
                <div className=" mr-2">#{job}</div>
                <div className=" mr-2">#{talkType}</div>
                <div className=" mr-2">#{personality}</div>
                <div className=" mr-2">#{tone}</div>
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
              // onClick={() => goFeed(CharacterInfo.characterId)}
              className="bg-white border-[2px] box-border  border-pink-500 text-pink-500 font-medium w-[50%] h-[48px] text-[16px] py-2 px-4 rounded-xl"
            >
              공유 안할래
            </button>
            <button
              // onClick={() => goFeed(CharacterInfo.characterId)}
              className="bg-pink-500 text-white font-medium w-[50%] h-[48px] text-[16px] py-2 px-4 rounded-xl"
            >
              지금 해볼래
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;
