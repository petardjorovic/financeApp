import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleSignIn } from "@/queryHooks/useGoogleSignIn";

function GoogleLoginButton() {
  const { signInWithGoogle } = useGoogleSignIn();
  const { pathname } = useLocation();

  return (
    <GoogleLogin
      onSuccess={(res) => {
        if (res.credential) {
          signInWithGoogle({ credential: res.credential });
        }
      }}
      onError={() => {
        toast.error("Google login failed");
      }}
      text={pathname === "/login" ? "continue_with" : "signup_with"}
      logo_alignment="center"
      // useOneTap
    />
  );
}

export default GoogleLoginButton;
