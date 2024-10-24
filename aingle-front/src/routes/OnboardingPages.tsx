import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import Survey from "../pages/onboarding/Survey";

const OnboardingPages = () => {
  return (
    <div className="h-full w-[375px] relative">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </div>
  );
};

export default OnboardingPages;
