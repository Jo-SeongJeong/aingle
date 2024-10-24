import React, { useEffect, useState } from "react";

interface SurveyElementButtonProps {
  button1Text: string;
  button2Text: string;
  chosed: number;
  onSelect: (buttonNumber: number) => void;
}

const SurveyElementButton: React.FC<SurveyElementButtonProps> = ({
  button1Text,
  button2Text,
  chosed,
  onSelect,
}) => {
  const [selected, setSelected] = useState<null | number>(null); // 초기 선택된 값을 null로 설정

  // 페이지가 변경될 때마다 선택 상태를 초기화
  useEffect(() => {
    setSelected(chosed);
  }, [button1Text]);

  const handleButtonClick = (buttonNumber: number) => {
    setSelected(buttonNumber); // 선택된 버튼 상태를 로컬로 저장
    onSelect(buttonNumber); // 상위 컴포넌트로 선택된 버튼 번호 전달
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 첫 번째 버튼 */}
      <button
        className={`px-6 py-3 w-[350px] rounded-full text-[14px] bg-[#ffe6f2] font-hakgyo ${
          selected === 1
            ? "border-2 border-[#fb599a] text-[#fb599a]"
            : "border-2 border-transparent"
        }`}
        onClick={() => handleButtonClick(1)}
      >
        {button1Text}
      </button>

      {/* 두 번째 버튼 */}
      <button
        className={`px-6 py-3 w-[350px] rounded-full text-[14px] bg-[#ffe6f2] font-hakgyo ${
          selected === 2
            ? "border-2 border-[#fb599a] text-[#fb599a]"
            : "border-2 border-transparent"
        }`}
        onClick={() => handleButtonClick(2)}
      >
        {button2Text}
      </button>
    </div>
  );
};

export default SurveyElementButton;
