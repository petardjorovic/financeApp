import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
// import { ErrorBoundary } from "react-error-boundary";
// import ErrorFallback from "./components/ErrorFallback.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { TransFiltersProvider } from "./contexts/TransFiltersProvider.tsx";
import RecurringBillsFiltersProvider from "./contexts/RecurringBillsFiltersProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace("/")}
    > */}
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <TransFiltersProvider>
          <RecurringBillsFiltersProvider>
            <App />
          </RecurringBillsFiltersProvider>
        </TransFiltersProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: { duration: 5000 },
            error: { duration: 5000 },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
    {/* </ErrorBoundary> */}
  </StrictMode>
);
