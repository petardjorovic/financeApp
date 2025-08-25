import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/queryHooks/useAuth";

function AppContainer() {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div className="flex w-screen h-screen items-center justify-center bg-Beige-100">
      <Loader2 className="mb-4" />
    </div>
  ) : user ? (
    <div className="container">
      <Outlet />
    </div>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{ redirectUrl: window.location.pathname }}
    />
  );
}

export default AppContainer;
