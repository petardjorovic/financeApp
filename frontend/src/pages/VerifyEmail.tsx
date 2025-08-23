import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/queryHooks/useVerifyEmail";
import { AlertCircleIcon, CheckCircle2Icon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

function VerifyEmail() {
  const { isCodeValid, isError, isLoading, isSuccess } = useVerifyEmail();

  return (
    <div className="flex min-h-screen justify-center bg-Beige-100">
      <div className="mx-auto max-w-md py-12 text-center mt-12">
        {!isCodeValid && (
          <>
            <Alert variant={"destructive"} className="mb-4">
              <AlertTitle className="flex items-center gap-x-2 justify-center">
                <AlertCircleIcon className="h-4 w-4" /> Invalid Code
              </AlertTitle>
            </Alert>
            <p>
              The verification code is missing or invalid.{" "}
              <Link to={"/forgot/password"} className="mx-auto">
                <Button
                  variant={"link"}
                  className="p-0 h-auto text-Blue cursor-pointer"
                >
                  Get a new link
                </Button>
              </Link>
            </p>
          </>
        )}
        {isLoading && (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        )}
        {isError && (
          <>
            <Alert variant={"destructive"} className="mb-4">
              <AlertTitle className="flex items-center gap-x-2 justify-center">
                <AlertCircleIcon className="h-4 w-4" /> Verification failed!
              </AlertTitle>
            </Alert>
            <p className="mb-4">
              The is either invalid or expired.{" "}
              <Link to={"/forgot/password"} className="mx-auto">
                <Button
                  variant={"link"}
                  className="text-Blue p-0 h-auto cursor-pointer"
                >
                  Get a new link
                </Button>
              </Link>
            </p>
          </>
        )}
        {isSuccess && (
          <Alert className="mb-4">
            <AlertTitle className="flex items-center gap-x-2 justify-center text-chart-2">
              <CheckCircle2Icon className="h-4 w-4" /> Email verified!
            </AlertTitle>
          </Alert>
        )}
        <Button className="bg-Grey-900">
          <Link to={"/login"}>Back to Login</Link>
        </Button>
      </div>
    </div>
  );
}

export default VerifyEmail;
