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

const App = () => {
  const location = useLocation();
  const matchPostDetail = useMatch("/post/:id"); // "/post/:id" 경로와 일치 여부 확인

  return (
    <div className="h-[780px] w-[375px] relative">
      <Routes>
        <Route path="/home/*" element={<HomePages />} />
        <Route path="/vote/*" element={<VotePages />} />
        <Route path="/mypage/*" element={<MyPages />} />
        <Route path="/write" element={<Write />} />
        <Route path="/notice/*" element={<NoticePages />} />
        <Route path="/*" element={<OnboardingPages />} />
        <Route path="/social-redirection" element={<SocialRedirection />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
      {!matchPostDetail &&
        location.pathname !== "/write" &&
        location.pathname !== "/" &&
        location.pathname !== "/mypage/edit" &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" && <Footer />}
    </div>
  );
};

export default App;
