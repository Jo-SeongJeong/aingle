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
import { getMessaging, onMessage } from "firebase/messaging";
import { useEffect } from "react";
import { app } from "./utils/firebase-init";

const App = () => {
  const location = useLocation();
  const matchPostDetail = useMatch("/post/:id"); // "/post/:id" 경로와 일치 여부 확인

  // useEffect(() => {
  //   const messaging = getMessaging(app);

  //   // console.log(messaging);

  //   onMessage(messaging, (payload) => {
  //     console.log("알림 도착 ", payload);
  //     const notificationTitle = payload!.notification!.title;
  //     const notificationOptions = {
  //       body: payload!.notification!.body,
  //     };

  //     if (Notification.permission === "granted") {
  //       new Notification(notificationTitle!, notificationOptions);
  //     }
  //   });
  // }, []);

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
        </Route>
      </Routes>

      {!matchPostDetail &&
        location.pathname !== "/result" &&
        location.pathname !== "/write" &&
        location.pathname !== "/vote/create" &&
        location.pathname !== "/" &&
        location.pathname !== "/mypage/edit" &&
        location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/loading" && <Footer />}
    </div>
  );
};

export default App;
