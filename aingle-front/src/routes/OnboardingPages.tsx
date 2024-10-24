import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import OnboardingLoading from "../pages/onboarding/OnboardingLoading";

const OnboardingPages = () => {
  return (
    <div className="h-full w-[375px] relative">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/loading" element={<OnboardingLoading />} />
      </Routes>
    </div>
  );
};

export default OnboardingPages;
