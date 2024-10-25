import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import OnboardingLoading from "../pages/onboarding/OnboardingLoading";
import OnboardingResult from "../pages/onboarding/OnboardingResult";

const OnboardingPages = () => {
  return (
    <div className="h-full w-[375px] relative">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/loading" element={<OnboardingLoading />} />
        <Route path="/result" element={<OnboardingResult />} />
      </Routes>
    </div>
  );
};

export default OnboardingPages;
