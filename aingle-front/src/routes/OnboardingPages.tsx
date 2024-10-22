import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";

const OnboardingPages = () => {
  return (
    <div className="h-full w-[375px] relative">
      <Routes>
        <Route path="/" element={<Onboarding />} />
      </Routes>
    </div>
  );
};

export default OnboardingPages;
