import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import logoLarge from "../assets/images/logo-larges.svg";

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
    <div className="flex flex-col min-h-screen justify-center bg-Beige-100">
      <div className="bg-Grey-900 px-[40px] py-[24px] w-full rounded-b-[8px] h-[70px] flex justify-center items-center mb-4">
        <img src={logoLarge} alt="logo" />
      </div>
      <div className="flex flex-1 items-start justify-center">
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
    </div>
  );
}

export default ResetPassword;
