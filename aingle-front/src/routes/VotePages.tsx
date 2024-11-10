import { Route, Routes } from "react-router-dom";
import Vote from "../pages/vote/Vote";
import CharDetail from "../pages/vote/CharDetail";
import CreateChar from "../pages/vote/CreateChar";
import VoteMain from "../pages/vote/VoteMain";

const VotePages = () => {
  return (
    <div className="h-full relative bg-white">
      <Routes>
        <Route path="/" element={<Vote />} />
        <Route path="/create" element={<CreateChar />} />
        <Route path="/chardetail/:id" element={<CharDetail />} />
        <Route path="/main" element={<VoteMain />} />
      </Routes>
    </div>
  );
};

export default VotePages;
