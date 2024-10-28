import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import birdBlur from "../../assets/icons/BirdBlur.png";
import "./OnboardingLoading.css";

const OnboardingLoading = () => {
  const navigate = useNavigate();

  // const one = localStorage.getItem("1");
  // const two = localStorage.getItem("2");
  // const three = localStorage.getItem("3");
  // const four = localStorage.getItem("4");

  const getResult = async () => {
    try {
      // 1. axios 설문 결과 담아서 요청 보내야함

      // 2. 받은 결과 담아서 localstorage에 담기

      // 3. 설문 결과 지우기
      localStorage.removeItem("1");
      localStorage.removeItem("2");
      localStorage.removeItem("3");
      localStorage.removeItem("4");

      navigate("/result");
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
