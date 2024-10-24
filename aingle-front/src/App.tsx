import { Route, Routes } from "react-router-dom";
import OnboardingPages from "./routes/OnboardingPages";
import HomePages from "./routes/HomePages";

const App = () => {
  return (
    <div className="h-[780px] w-[375px] relative">
      <Routes>
        <Route path="/home/*" element={<HomePages />} />
        <Route path="/*" element={<OnboardingPages />} />
      </Routes>
    </div>
  );
};

export default App;
