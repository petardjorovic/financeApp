import logoLarge from "../assets/images/logo-larges.svg";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import eye from "../assets/images/eye.png";
import eyeSlash from "../assets/images/Icon=eye-slash.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

function RegisterForm() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  return (
    <div className="h-screen w-full md:w-[58%] flex justify-center items-center flex-col relative">
      <div className="bg-Grey-900 px-[40px] py-[24px] w-full md:hidden rounded-b-[8px] absolute top-0 h-[70px] flex justify-center items-center">
        <img src={logoLarge} alt="logo" />
      </div>
      <div className="w-[343px] sm:w-[400px] md:w-[400px] lg:w-[560px] p-[32px] bg-White rounded-[12px]">
        <h1 className="font-bold text-[32px] mb-[32px]">Sign Up</h1>
        <form className="m-0">
          <div className="mb-4">
            <Label
              htmlFor="fullName"
              className="text-xs mb-1 text-Grey-500 font-semibold"
            >
              Full name
            </Label>
            <Input type="text" id="fullName" className="px-5 py-3 h-[45px]" />
          </div>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="text-xs mb-1 text-Grey-500 font-semibold"
            >
              Email
            </Label>
            <Input type="email" id="email" className="px-5 py-3 h-[45px]" />
          </div>
          <div className="mb-3">
            <Label
              htmlFor="password"
              className="text-xs mb-1 text-Grey-500 font-semibold"
            >
              Create Password
            </Label>
            <div className="relative mb-1 h-[45px]">
              <Input
                type={showPass ? "text" : "password"}
                id="password"
                className="px-5 py-3 h-full"
              />{" "}
              {showPass ? (
                <img
                  src={eyeSlash}
                  alt="eyeSlash"
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPass((prev) => !prev)}
                />
              ) : (
                <img
                  src={eye}
                  alt="eye"
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPass((prev) => !prev)}
                />
              )}
            </div>
            <p className="text-Grey-500 text-xs text-right">
              Password must be at least 8 characters
            </p>
          </div>
          <div className="mb-8">
            <Label
              htmlFor="confirmPassword"
              className="text-xs mb-1 text-Grey-500 font-semibold"
            >
              Confirm Password
            </Label>
            <div className="relative mb-1.5 h-[45px]">
              <Input
                type={showConfirmPass ? "text" : "password"}
                id="confirmPassword"
                className="px-5 py-3 h-full"
              />{" "}
              {showConfirmPass ? (
                <img
                  src={eyeSlash}
                  alt="eyeSlash"
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                />
              ) : (
                <img
                  src={eye}
                  alt="eye"
                  className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                />
              )}
            </div>
          </div>
          <Button className="w-full p-4 rounded-[8px] text-sm font-semibold h-[53px] mb-8">
            Create Account
          </Button>
          <p className="text-Grey-500 text-sm text-center">
            Already have an account?{" "}
            <span className="text-Grey-900 font-semibold underline">
              <Link to={"/login"}>Login</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
