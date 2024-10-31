import { Route, Routes } from "react-router-dom";
import MyPage from "../pages/mypage/MyPage";
import EditProfile from "../pages/mypage/EditProfile";

const MyPages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
    </div>
  );
};

export default MyPages;
