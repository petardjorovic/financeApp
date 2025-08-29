import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/queryHooks/useAuth";
import MainAppLayout from "@/layouts/MainAppLayout";

function AppContainer() {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div className="flex w-screen h-screen items-center justify-center bg-Beige-100">
      <Loader2 className="mb-4 h-4 w-4 animate-spin" />
    </div>
  ) : user ? (
    <MainAppLayout />
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
}

export default AppContainer;
