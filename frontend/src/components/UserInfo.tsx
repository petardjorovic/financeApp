import { profileSchema, userPasswordSchema } from "@/lib/schemas";
import { useAuth } from "@/queryHooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import type z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export type userFormValues = z.infer<typeof profileSchema>;
export type userPasswordsValues = z.infer<typeof userPasswordSchema>;

function UserInfo() {
  const [fileInputKey, setFileInputKey] = useState(0);
  const { user, isPending } = useAuth();
  const userForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: user?.email,
      fullName: user?.fullName,
      avatar: undefined,
    },
  });

  const userPasswordForm = useForm({
    resolver: zodResolver(userPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitUserForm = (values: userFormValues) => {
    console.log(values);
  };

  const onSubmitUserPassword = (values: userPasswordsValues) => {
    console.log(values);
  };

  return (
    <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
      <h1 className="text-2xl font-semibold text-Grey-900">Update user data</h1>
      {isPending ? (
        <div className="flex items-center justify-center w-full min-h-[418px]">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>
          <Form {...userForm}>
            <form
              onSubmit={userForm.handleSubmit(onSubmitUserForm)}
              className="px-1 md:px-4 flex flex-col h-full"
            >
              {/* Email */}
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      Email
                    </FormLabel>
                    <FormControl className="w-60 sm:w-80 lg:w-70">
                      <Input
                        disabled
                        className="px-5 py-3 h-[45px] border border-Grey-300"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                  </FormItem>
                )}
              />
              {/* Full Name */}
              <FormField
                control={userForm.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      Full Name
                    </FormLabel>
                    <FormControl className="w-60 sm:w-80 lg:w-70">
                      <Input
                        className="px-5 py-3 h-[45px] border border-Grey-300"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                  </FormItem>
                )}
              />
              {/* Avatar */}
              <FormField
                control={userForm.control}
                name="avatar"
                render={({ field: { onChange, onBlur, name, ref } }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      Avatar image
                    </FormLabel>
                    <FormControl className="w-60 sm:w-80 lg:w-70">
                      <Input
                        key={fileInputKey}
                        type="file"
                        accept="image/*"
                        // className="px-5 py-3 h-[45px]"
                        className="h-[45px] py-0 pl-0 border-none shadow-none file:mr-3 file:py-2 file:px-4 file:rounded-[8px] file:border-0 file:text-sm file:h-full file:font-semibold file:bg-Grey-900 file:text-white file:hover:bg-Grey-500 file:cursor-pointer file:transition-colors file:duration-300"
                        name={name}
                        ref={ref}
                        onBlur={onBlur}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          onChange(file ?? null);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                  </FormItem>
                )}
              />
              <div className="flex py-3 gap-x-3 justify-center lg:justify-end">
                <Button
                  className="text-White bg-Red rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] hover:bg-Red/70"
                  type="button"
                  onClick={() => {
                    userForm.reset();
                    setFileInputKey((prev) => prev + 1);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  // disabled={disabled}
                  className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] w-40 sm:w-50"
                >
                  {/* {disabled ? (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    ) : ( */}
                  Update account
                  {/* )} */}
                </Button>
              </div>
            </form>
          </Form>

          <h1 className="text-2xl font-semibold text-Grey-900">
            Update password
          </h1>
          <Form {...userPasswordForm}>
            <form
              onSubmit={userPasswordForm.handleSubmit(onSubmitUserPassword)}
              className="px-1 md:px-4 flex flex-col h-full"
            >
              {/* Password */}
              <FormField
                control={userPasswordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      New Password
                    </FormLabel>
                    <FormControl className="w-60 sm:w-80 lg:w-70">
                      <Input
                        type="password"
                        className="px-5 py-3 h-[45px] border border-Grey-300"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                  </FormItem>
                )}
              />
              {/*Confirm Password */}
              <FormField
                control={userPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      Confirm Password
                    </FormLabel>
                    <FormControl className="w-60 sm:w-80 lg:w-70">
                      <Input
                        type="password"
                        className="px-5 py-3 h-[45px] border border-Grey-300"
                        {...field}
                        required
                      />
                    </FormControl>
                    <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                  </FormItem>
                )}
              />

              <div className="flex py-3 gap-x-3 justify-center lg:justify-end w-full">
                <Button
                  className="text-White bg-Red rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] hover:bg-Red/70"
                  type="button"
                  onClick={() => userPasswordForm.reset()}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  // disabled={disabled}
                  className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] w-40 sm:w-50"
                >
                  {/* {disabled ? (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    ) : ( */}
                  Update password
                  {/* )} */}
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
}

export default UserInfo;
