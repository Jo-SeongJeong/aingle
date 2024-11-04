import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import birdBlur from "../../assets/icons/BirdBlur.png";
import axios from "axios";
import "./OnboardingLoading.css";
import { CharacterInfoShort } from "../../model/character";

const OnboardingLoading = () => {
  const navigate = useNavigate();
  const getResult = async (): Promise<void> => {
    const one = localStorage.getItem("1");
    const two = localStorage.getItem("2");
    const three = localStorage.getItem("3");
    const four = localStorage.getItem("4");
    try {
      // 설문 결과를 담아 POST 요청 보내기
      const response = await axios.post<CharacterInfoShort>(
        "https://aingle.co.kr/api/characters/survey",
        {
          ei: parseInt(one || "0", 10),
          sn: parseInt(two || "0", 10),
          tf: parseInt(three || "0", 10),
          jp: parseInt(four || "0", 10),
        }
      );
      // 설문 데이터 삭제
      localStorage.removeItem("1");
      localStorage.removeItem("2");
      localStorage.removeItem("3");
      localStorage.removeItem("4");

      // 결과 페이지로 이동하며 응답 데이터를 함께 전달
      navigate("/result", { state: response.data });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      getResult();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#ff4fa3] h-full w-full flex flex-col justify-center items-center rainbow-animation">
      {/* 중앙의 이미지 */}
      <img
        src={birdBlur}
        className="w-[400px] h-[375px] mb-6 absolute top-[150px]"
      />
      {/* 텍스트 */}
      <div className="text-center pt-[150px]">
        <h1 className="text-white text-[24px] text-pretty mb-4 font-hakgyo">
          잠깐만 기다려!
        </h1>
        <h2 className="text-white text-[24px]">
          <span className="text-gradient font-hakgyo">앵토피아</span>에서 친구를
          데려올게
        </h2>
      </div>
    </div>
  );
};

export default OnboardingLoading;
