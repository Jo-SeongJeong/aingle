import React from "react";
import { Route, Routes } from "react-router-dom";
import Vote from "../pages/vote/Vote";

const VotePages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<Vote />} />
      </Routes>
    </div>
  );
};

export default VotePages;
