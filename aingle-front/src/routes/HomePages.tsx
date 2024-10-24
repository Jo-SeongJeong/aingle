import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";

const HomePages = () => {
  return (
    <div className="h-full w-[375px] relative">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route />
        <Route />
        <Route />
        <Route />
      </Routes>
    </div>
  );
};

export default HomePages;
