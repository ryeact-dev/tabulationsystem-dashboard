import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SkeletonLandingPage from "./components/Skeletons/SkeletonLandingPage";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Suspense fallback={<SkeletonLandingPage />}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Suspense>
  </React.StrictMode>
);
