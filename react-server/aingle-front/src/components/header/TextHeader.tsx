import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 프롭스 타입 정의
interface TextHeaderProps {
  navTo: string | number;
  headerText: string;
}

const TextHeader = ({ navTo, headerText }: TextHeaderProps) => {
  const navigate = useNavigate();
  const [path, setPath] = useState<string | number>("");

  useEffect(() => {
    if (navTo === "") {
      setPath(-1);
    } else {
      setPath(navTo);
    }
  }, [navTo]);

  return (
    <div className="absolute top-0 bg-white w-full py-[15px] px-[18px] flex justify-between items-center shadow-md">
      <div
        onClick={() => {
          if (typeof path === "number") {
            navigate(path); // delta를 사용하는 경우
          } else {
            navigate(path); // 경로를 사용하는 경우
          }
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
