import type z from "zod";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Alert, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { resetPasswordSchema } from "@/lib/schemas";
import { useResetPassword } from "@/queryHooks/useResetPassword";
import eye from "../assets/images/eye.png";
import eyeSlash from "../assets/images/Icon=eye-slash.png";

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

function ResetPasswordForm({ code }: { code: string | null }) {
  const [show, setShow] = useState<boolean>(false);
  const { resetUserPassword, isSuccess, isPending, isError, error } =
    useResetPassword();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: ResetPasswordFormValues) => {
    console.log(values);
    if (code) {
      resetUserPassword({ verificationCode: code, password: values.password });
    }
  };

  return (
    <div className="w-[90%] sm:w-[400px] md:w-[400px] lg:w-[560px] p-[32px] bg-White rounded-[12px]">
      <h1 className="font-bold text-2xl md:text-[32px] mb-4 text-Grey-900 text-center">
        Change your password
      </h1>
      <Form {...form}>
        {isError && (
          <Alert
            variant={"destructive"}
            className="border-none py-0 bg-secondary"
          >
            <AlertTitle className="flex items-center gap-x-2 justify-center">
              <AlertCircleIcon /> {error?.message || "An error occurred!"}
            </AlertTitle>
          </Alert>
        )}
        {isSuccess ? (
          <div className="text-center">
            <Alert className="mb-4">
              <AlertTitle className="flex items-center gap-x-2 justify-center text-chart-2">
                <CheckCircle2Icon className="h-4 w-4" /> Password updated
                successfully!
              </AlertTitle>
            </Alert>{" "}
            <Link to={"/login"} replace className="text-Blue hover:underline">
              <Button className="bg-Grey-900 cursor-pointer">Login</Button>
            </Link>
          </div>
        ) : (
          <>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative h-[45px]">
                        <Input
                          {...field}
                          className="h-full px-5 py-3"
                          type={show ? "text" : "password"}
                          required
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
                    <FormDescription className="text-Grey-500 mt-0 text-xs text-right">
                      Password must be at least 6 characters
                    </FormDescription>
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
                  "Change Password"
                )}
              </Button>
            </form>
          </>
        )}
      </Form>
    </div>
  );
}

export default ResetPasswordForm;
