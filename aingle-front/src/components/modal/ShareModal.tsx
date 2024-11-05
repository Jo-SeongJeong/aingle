import { ICharInfo } from "../../model/character";
import { useNavigate } from "react-router-dom";
import green from "../../assets/imgs/green.png";
import { IShareModal } from "../../model/modal";

const ShareModal = ({ onClose }: IShareModal) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-md w-[300px] relative flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full h-full flex flex-col items-center ">
          <img src={green} className="w-20 h-20 mb-[15px]" />
          <h1 className="text-[18px] font-semibold mb-5">게시 앵료!</h1>

          <div className=" rounded-[10px] p-[10px] flex flex-col gap-2 items-center">
            <h1 className="text-[16px] font-gray-2">
              게시한 캐릭터는 관리자 확인 후
            </h1>
            <h1 className="text-[16px] font-gray-2 mb-[30px]">
              임의로 삭제될 수 있앵
            </h1>
          </div>

          <button className="bg-pink-base text-white font-medium w-[50%] h-[48px] text-[16px] py-2 px-4 rounded-xl">
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
