import circleBird from "../../assets/icons/CircleBird.png";
import kakao from "../../assets/icons/kakao.png";
import google from "../../assets/icons/google.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const login = async (platform: string) => {
    // 로그인 로직 수행

    navigate("/home");
    return;
  };

  return (
    <div className="bg-[#fb599a] h-full w-full flex flex-col justify-center items-center rainbow-animation">
      <h1 className="text-white text-[18px] text-pretty font-normal">
        나를 위한 SNS 공간
      </h1>
      <h1 className="text-white text-[48px] text-pretty mb-4 font-hakgyo">
        aingle
      </h1>
      <img
        src={circleBird}
        className="w-[150px] h-[150px] mb-20"
        alt="Circle Bird"
      />
      <div className="text-center">
        <img
          src={google}
          className="w-[285px] h-[53px] mb-6"
          alt="Google Login"
          onClick={() => login("google")}
        />
        <img
          src={kakao}
          className="w-[285px] h-[53px] mb-6"
          alt="Kakao Login"
          onClick={() => login("kakao")}
        />
      </div>
    </div>
  );
};

export default Login;
