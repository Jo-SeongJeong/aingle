import { Route, Routes, useNavigate } from "react-router-dom";
import OnboardingPages from "./routes/OnboardingPages";
import HomePages from "./routes/HomePages";
import Footer from "./components/footer/Footer";
import VotePages from "./routes/VotePages";
import MyPages from "./routes/MyPages";

const App = () => {
  return (
    <div className="h-[780px] w-[375px] relative">
      <Routes>
        <Route path="/home/*" element={<HomePages />} />
        <Route path="/vote/*" element={<VotePages />} />
        <Route path="/mypage/*" element={<MyPages />} />
        <Route path="/*" element={<OnboardingPages />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
