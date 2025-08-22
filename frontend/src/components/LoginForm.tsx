import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Loader2Icon } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useLogin } from "@/queryHooks/useLogin";
import { loginFormSchema } from "@/lib/schemas";
import logoLarge from "../assets/images/logo-larges.svg";
import eye from "../assets/images/eye.png";
import eyeSlash from "../assets/images/Icon=eye-slash.png";

type LoginFormValues = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const [show, setShow] = useState(false);
  const { signIn, isPending } = useLogin();

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormValues) => {
    signIn(values);
  };

  return (
    <div className="h-screen w-full md:w-[58%] flex justify-center items-center flex-col relative">
      <div className="bg-Grey-900 px-[40px] py-[24px] w-full md:hidden rounded-b-[8px] absolute top-0 h-[70px] flex justify-center items-center">
        <img src={logoLarge} alt="logo" />
      </div>
      <div className="w-[343px] sm:w-[400px] md:w-[400px] lg:w-[560px] p-[32px] bg-White rounded-[12px]">
        <h1 className="font-bold text-[32px] mb-[32px] text-Grey-900">Login</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel className="text-xs mb-0 text-Grey-500 font-semibold leading-1">
                    Email address
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
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0 mb-1">
                  <FormLabel className="text-xs mb-0 text-Grey-500 font-semibold leading-1">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative h-[45px]">
                      <Input
                        className="px-5 py-3 h-full"
                        required
                        {...field}
                        type={show ? "text" : "password"}
                      />
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
                  </FormControl>
                  <FormMessage className="mt-0" />
                </FormItem>
              )}
            />
            <div className="w-full text-right">
              <Link
                to={"/password/forgot"}
                className="text-Grey-900 font-semibold text-sm hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button
              className="w-full p-4 rounded-[8px] text-sm font-semibold h-[53px] mb-8 bg-Grey-900"
              type="submit"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </Button>
            <p className="text-Grey-500 text-sm text-center">
              Need to create an account?{" "}
              <span className="text-Grey-900 font-semibold underline">
                <Link to={"/register"}>Sign Up</Link>
              </span>
            </p>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default LoginForm;
