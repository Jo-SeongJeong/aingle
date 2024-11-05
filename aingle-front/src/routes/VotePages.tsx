import { Route, Routes } from "react-router-dom";
import Vote from "../pages/vote/Vote";
import CharDetail from "../pages/vote/CharDetail";
import VoteMain from "../pages/vote/VoteMain";

const VotePages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<Vote />} />
        <Route path="/chardetail/:id" element={<CharDetail />} />
        <Route path="/main" element={<VoteMain />} />
      </Routes>
    </div>
  );
};

export default VotePages;
