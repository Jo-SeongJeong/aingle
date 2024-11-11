import { Route, Routes } from "react-router-dom";
import Onboarding from "../pages/onboarding/Onboarding";
import OnboardingLoading from "../pages/onboarding/OnboardingLoading";
import OnboardingResult from "../pages/onboarding/OnboardingResult";
import Login from "../pages/onboarding/Login";
import Signup from "../pages/onboarding/Signup";

const OnboardingPages = () => {
  return (
    <div className="min-h-screen  relative bg-white">
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/loading" element={<OnboardingLoading />} />
        <Route path="/result" element={<OnboardingResult />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default OnboardingPages;
