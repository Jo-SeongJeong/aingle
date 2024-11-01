import { Route, Routes } from "react-router-dom";
import Notice from "../pages/notice/Notice";

const NoticePages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<Notice />} />
      </Routes>
    </div>
  );
};

export default NoticePages;
