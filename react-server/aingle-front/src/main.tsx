import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import ReactGA from "react-ga4";
import { useEffect } from "react";

const queryClient = new QueryClient();

ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <BrowserRouter>
        <Analytics />
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </QueryClientProvider>
);
