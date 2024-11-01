import { Route, Routes } from "react-router-dom";
import Vote from "../pages/vote/Vote";
import CharDetail from "../pages/vote/CharDetail";

const VotePages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<Vote />} />
        <Route path="/chardetail/:id" element={<CharDetail />} />
      </Routes>
    </div>
  );
};

export default VotePages;
