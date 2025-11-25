import { useAuth } from "@/queryHooks/useAuth";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  return (
    <div>
      <h1>This is home page.</h1>
      {isLoading ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" aria-label="Loading budgets" />
        </div>
      ) : (
        !user && (
          <>
            <button onClick={() => navigate("/login")}>Sign in</button>
            <button onClick={() => navigate("/register")}>Sign up</button>
          </>
        )
      )}
    </div>
  );
}

export default Home;
