import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home/Home";

const HomePages = () => {
  const location = useLocation();

  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<Home key={location.pathname} />} />
      </Routes>
    </div>
  );
};

export default HomePages;
