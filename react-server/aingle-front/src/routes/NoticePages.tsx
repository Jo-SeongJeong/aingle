import { Route, Routes } from "react-router-dom";
import Notice from "../pages/notice/Notice";

const NoticePages = () => {
  return (
    <div className="min-h-screen relative bg-white">
      <Routes>
        <Route path="/" element={<Notice />} />
      </Routes>
    </div>
  );
};

export default NoticePages;
