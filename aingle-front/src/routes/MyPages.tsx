import { Route, Routes } from "react-router-dom";
import MyPage from "../pages/mypage/MyPage";

const MyPages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<MyPage />} />
      </Routes>
    </div>
  );
};

export default MyPages;
