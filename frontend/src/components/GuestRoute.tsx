import { Navigate } from "react-router-dom";
import { useAuth } from "@/queryHooks/useAuth";
import { Loader2 } from "lucide-react";

function GuestRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading)
    return (
      <div className="flex w-screen h-screen items-center justify-center bg-Beige-100">
        <Loader2 className="animate-spin" />
      </div>
    );

  if (user) return <Navigate to={"/app"} replace />;

  return children;
}

export default GuestRoute;
