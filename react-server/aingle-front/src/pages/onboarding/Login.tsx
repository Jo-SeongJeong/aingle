import circleBird from "../../assets/icons/CircleBird.png";
import kakao from "../../assets/icons/kakao.png";
import google from "../../assets/icons/google.png";

const Login = () => {
  const restKey = import.meta.env.VITE_REACT_APP_REST_KEY;
  const redirect = import.meta.env.VITE_REACT_APP_REDIRECT_URI;
  const googleKey = import.meta.env.VITE_REACT_APP_GOOGLE_KEY;
  const googleRedirect = import.meta.env.VITE_REACT_APP_GOOGLE_REDIRECT_URI;
  const login = async (platform: string) => {
    if (platform === "kakao") {
      try {
        // 카카오 로그인 URL로 리다이렉트하여 사용자에게 카카오 로그인 창을 보여줍니다
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${restKey}&redirect_uri=${redirect}&response_type=code`;

        // 로그인 창으로 리다이렉트
        window.location.href = kakaoAuthUrl;
      } catch (error) {
        console.error("카카오 로그인 요청 실패:", error);
        alert("카카오 로그인에 실패했습니다.");
      }
    } else if (platform === "google") {
      try {
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${googleKey}&redirect_uri=${googleRedirect}&response_type=token&scope=https://www.googleapis.com/auth/userinfo.email`;
        window.location.href = googleAuthUrl;
      } catch (error) {
        console.error("구글 로그인 요청 실패:", error);
        alert("구글 로그인에 실패했습니다.");
      }
    }
  };

  return (
    <div className="bg-[#fb599a] min-h-screen w-full flex flex-col justify-center items-center rainbow-animation">
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
