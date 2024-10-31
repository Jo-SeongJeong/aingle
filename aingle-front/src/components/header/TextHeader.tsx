import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

// 프롭스 타입 정의
interface TextHeaderProps {
  navTo: string;
  headerText: string;
}

const TextHeader = ({ navTo, headerText }: TextHeaderProps) => {
  // 프롭스 타입 지정
  const navigate = useNavigate();

  return (
    <div className="absolute top-0 bg-white w-full py-[15px] px-[18px] flex justify-between items-center">
      <div
        onClick={() => {
          navigate(navTo);
        }}
        className="cursor-pointer"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-6" />
      </div>
      <h1 className="font-semibold text-[16px]">{headerText}</h1>
      <div></div>
    </div>
  );
};

export default TextHeader;
