import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import OnboardingLoading from "../pages/onboarding/OnboardingLoading";
import OnboardingResult from "../pages/onboarding/OnboardingResult";
import Login from "../pages/onboarding/Login";

const OnboardingPages = () => {
  return (
    <div className="h-full w-[375px] relative bg-white">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/loading" element={<OnboardingLoading />} />
        <Route path="/result" element={<OnboardingResult />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default OnboardingPages;
