import { Route, Routes } from "react-router-dom";
import MyPage from "../pages/mypage/MyPage";
import EditProfile from "../pages/mypage/EditProfile";
import Following from "../pages/mypage/Following";

const MyPages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<MyPage />} />
        <Route path="/edit" element={<EditProfile />} />
        <Route path="/following" element={<Following />} />
      </Routes>
    </div>
  );
};

export default MyPages;
