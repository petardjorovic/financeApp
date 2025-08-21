import { Input } from "./ui/input";
import { Label } from "./ui/label";
import eye from "../assets/images/eye.png";
import eyeSlash from "../assets/images/Icon=eye-slash.png";
import { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

function LoginForm() {
  const [show, setShow] = useState(false);
  return (
    <div className="h-screen w-full md:w-[58%] flex justify-center items-center">
      <div className="w-[560px] h-[442px] p-[32px] bg-White rounded-[12px]">
        <h1 className="font-bold text-[32px] mb-[32px]">Login</h1>
        <form className="m-0">
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="text-xs mb-1 text-Grey-500 font-semibold"
            >
              Email
            </Label>
            <Input type="email" id="email" className="px-5 py-3 h-[45px]" />
          </div>
          <div>
            <Label
              htmlFor="password"
              className="text-xs mb-1 text-Grey-500 font-semibold"
            >
              Password
            </Label>
            <div className="relative mb-2.5 h-[45px]">
              <Input
                type={show ? "text" : "password"}
                id="password"
                className="px-5 py-3 h-full"
              />{" "}
              {show ? (
                <img
                  src={eyeSlash}
                  alt="eyeSlash"
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              ) : (
                <img
                  src={eye}
                  alt="eye"
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShow((prev) => !prev)}
                />
              )}
            </div>
            <p className="text-Grey-900 font-semibold text-sm text-right mb-5 hover:underline">
              <Link to={"/"}>Forgot password?</Link>
            </p>
            <Button className="w-full p-4 rounded-[8px] text-sm font-semibold h-[53px] mb-8">
              Login
            </Button>
            <p className="text-Grey-500 text-sm text-center">
              Need to create an account?{" "}
              <span className="text-Grey-900 font-semibold underline">
                <Link to={"/register"}>Sign Up</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
