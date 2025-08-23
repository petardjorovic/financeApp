import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { registerFormSchema } from "@/lib/schemas";
import logoLarge from "../assets/images/logo-larges.svg";
import eye from "../assets/images/eye.png";
import eyeSlash from "../assets/images/Icon=eye-slash.png";
import { useRegister } from "@/queryHooks/useRegister";
import { Loader2Icon } from "lucide-react";

export type registerFormValues = z.infer<typeof registerFormSchema>;

function RegisterForm() {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const { signUp, isPending } = useRegister();

  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: registerFormValues) => {
    signUp(values);
  };

  return (
    <>
      <div className="bg-Grey-900 px-[40px] py-[24px] w-full md:hidden rounded-b-[8px] h-[70px] flex justify-center items-center mb-4">
        <img src={logoLarge} alt="logo" />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="w-[90%] sm:w-[400px] md:w-[400px] lg:w-[560px] p-[32px] bg-White rounded-[12px]">
          <h1 className="font-bold text-[32px] mb-[32px] text-Grey-900">
            Sign Up
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                name="fullName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-xs mb-0 text-Grey-500 font-semibold leading-1">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="px-5 py-3 h-[45px]"
                        {...field}
                        autoFocus
                        required
                      />
                    </FormControl>
                    <FormMessage className="mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-xs mb-0 text-Grey-500 font-semibold leading-1">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="px-5 py-3 h-[45px]"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage className="mt-0" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-xs mb-0 text-Grey-500 font-semibold leading-1">
                      Create Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative h-[45px]">
                        <Input
                          {...field}
                          className="h-full px-5 py-3"
                          required
                          type={showPass ? "text" : "password"}
                        />
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
                    </FormControl>
                    <FormDescription className="text-Grey-500 mt-0 text-xs text-right">
                      Password must be at least 6 characters
                    </FormDescription>
                    {/* <FormMessage className="mt-0" /> */}
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="space-y-0">
                    <FormLabel className="text-xs mb-0 text-Grey-500 font-semibold leading-1">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative h-[45px]">
                        <Input
                          {...field}
                          className="h-full px-5 py-3"
                          required
                          type={showConfirmPass ? "text" : "password"}
                        />
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
                    </FormControl>
                    <FormMessage className="mt-0" />
                  </FormItem>
                )}
              />
              <Button
                className="w-full p-4 rounded-[8px] text-sm font-semibold h-[53px] mt-4 mb-8 bg-Grey-900"
                type="submit"
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Account"
                )}
              </Button>
              <p className="text-Grey-500 text-sm text-center">
                Already have an account?{" "}
                <span className="text-Grey-900 font-semibold underline">
                  <Link to={"/login"}>Login</Link>
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
