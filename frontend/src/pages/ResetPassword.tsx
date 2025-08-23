import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const exp = searchParams.get("exp");
  const now = Date.now();

  const expNum = exp ? Number(exp) : NaN;
  const isLinkValid =
    typeof code === "string" &&
    code.trim().length > 0 &&
    Number.isFinite(expNum) &&
    expNum > now;

  return (
    <div className="flex min-h-screen justify-center bg-Beige-100">
      <div className="py-12 px-6 mt-12">
        {isLinkValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="text-center space-y-4">
            <Alert variant={"destructive"}>
              <AlertTitle className="flex items-center justify-center gap-x-2">
                <AlertCircleIcon />
                Invalid link
              </AlertTitle>
            </Alert>
            <p>The link is either invalid or expired.</p>
            <Link to={"/password/forgot"} replace={true}>
              <Button
                variant={"link"}
                className="p-0 h-auto text-Blue cursor-pointer"
              >
                Request a new password reset link
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
