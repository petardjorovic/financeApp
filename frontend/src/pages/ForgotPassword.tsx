import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/lib/schemas";
import { useSendPassordResetEmail } from "@/queryHooks/useSendPasswordResetEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type z from "zod";

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

function ForgotPassword() {
  const { sendPasswordReset, error, isError, isPending, isSuccess } =
    useSendPassordResetEmail();
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordFormValues) => {
    sendPasswordReset(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-Beige-100">
      <div className="w-[90%] sm:w-[400px] md:w-[400px] lg:w-[560px] p-[32px] bg-White rounded-[12px]">
        <h1 className="font-bold text-[32px] mb-4 text-Grey-900 text-center">
          Reset your password
        </h1>
        <Form {...form}>
          {isSuccess ? (
            <Alert className="mb-4">
              <AlertTitle className="flex items-center justify-center gap-x-2 text-chart-2">
                <CheckCircle2Icon className="h-4 w-4" /> Email sent! Check your
                email for further instructions.
              </AlertTitle>
            </Alert>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {isError && (
                <Alert
                  variant={"destructive"}
                  className="border-none py-0 bg-secondary"
                >
                  <AlertTitle className="flex items-center justify-center gap-x-2">
                    <AlertCircleIcon /> {error?.message || "An error occurred"}
                  </AlertTitle>
                </Alert>
              )}
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
                        {...field}
                        required
                        autoFocus
                        className="px-5 py-3 h-[45px]"
                      />
                    </FormControl>
                    <FormMessage className="mt-0" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full p-4 rounded-[8px] text-sm font-semibold h-[53px] mb-8 bg-Grey-900"
              >
                {isPending ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          )}
          <p className="text-Grey-500 text-sm text-center">
            Go back to&nbsp;
            <span className="text-Grey-900 font-semibold underline">
              <Link to={"/login"} replace={true}>
                Sign in
              </Link>
            </span>
            &nbsp;or&nbsp;
            <span className="text-Grey-900 font-semibold underline">
              <Link to={"/register"} replace={true}>
                Sign up
              </Link>
            </span>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
