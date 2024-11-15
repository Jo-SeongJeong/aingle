import { Route, Routes, useLocation, useMatch } from "react-router-dom";
import OnboardingPages from "./routes/OnboardingPages";
import HomePages from "./routes/HomePages";
import Footer from "./components/footer/Footer";
import VotePages from "./routes/VotePages";
import MyPages from "./routes/MyPages";
import Write from "./pages/write/Write";
import NoticePages from "./routes/NoticePages";
import SocialRedirection from "./pages/onboarding/SocialRedirection";
import PostDetail from "./pages/post/PostDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import "./utils/foregroundMessage";
import ChatPages from "./routes/ChatPages";
import { useEffect } from "react";

const App = () => {
  const location = useLocation();
  const matchPostDetail = useMatch("/post/:id"); // "/post/:id" 경로와 일치 여부 확인
  const matchChatDetail = useMatch("/chat/:id"); // "/post/:id" 경로와 일치 여부 확인

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="h-full relative">
      <Routes>
        {/* 온보딩 페이지는 보호되지 않음 */}
        <Route path="/*" element={<OnboardingPages />} />
        <Route path="/social-redirection" element={<SocialRedirection />} />

        <Route path="/home/*" element={<HomePages />} />
        {/* 보호된 라우트 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/vote/*" element={<VotePages />} />
          <Route path="/mypage/*" element={<MyPages />} />
          <Route path="/write" element={<Write />} />
          <Route path="/notice/*" element={<NoticePages />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/chat/*" element={<ChatPages />} />
        </Route>
      </Routes>

      {!matchPostDetail &&
        !matchChatDetail &&
        location.pathname !== "/result" &&
        location.pathname !== "/write" &&
        location.pathname !== "/vote/create" &&
        location.pathname !== "/" &&
        location.pathname !== "/mypage/edit" &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/chat" &&
        location.pathname !== "/loading" && <Footer />}
    </div>
  );
};

export default App;
