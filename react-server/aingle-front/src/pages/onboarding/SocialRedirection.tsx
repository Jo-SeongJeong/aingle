import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useRecoilState } from "recoil";
import { jwtDecode } from "jwt-decode";
import { userDataState } from "../../store/atoms";

const SocialRedirection: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useRecoilState(userDataState);

  useEffect(() => {
    const socialLogin = async () => {
      try {
        const platform = new URL(window.location.href).searchParams.get(
          "platform"
        );

        try {
          let response: AxiosResponse<{ email: string }> | undefined;
          if (platform === "kakao") {
            const code = new URL(window.location.href).searchParams.get("code");
            response = await axios.post(
              `https://aingle.co.kr/api/oauth/kakao/${code}`
            );
          } else if (platform === "google") {
            const params = new URLSearchParams(window.location.hash.slice(1));
            const access_token = params.get("access_token");

            response = await axios.post(
              `https://aingle.co.kr/api/oauth/google/${access_token}`
            );
          }

          if (response && response.status === 200) {
            sessionStorage.setItem("email", response.data.email);
            navigate("/signup", { state: { method: platform } });
          }
        } catch (error: any) {
          if (axios.isAxiosError(error) && error.response?.status === 303) {
            // 이미 가입된 회원
            sessionStorage.setItem("accessToken", error.response.data.token);
            const decoded = jwtDecode(error.response.data.token);
            setUserData(decoded);

            navigate("/home");
          } else {
            console.error("요청 실패:", error);
          }
        }
      } catch (error: any) {
        console.error("소셜 로그인 요청 실패:", error);
        alert("로그인에 실패했습니다.");
      }
    };

    socialLogin();
  }, [navigate]);

  return <div>SocialRedirection</div>;
};

export default SocialRedirection;
