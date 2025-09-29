import { potDepositWithdrawSchema } from "@/lib/schemas";
import type { Pot } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { IoIosCloseCircleOutline } from "react-icons/io";
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

type Props = {
  isWithdrawOpen: boolean;
  setIsWithdrawOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pot: Pot;
};

type withdrawPotFormValues = z.infer<typeof potDepositWithdrawSchema>;

function WithdrawPotForm({ isWithdrawOpen, setIsWithdrawOpen, pot }: Props) {
  const progressValue = (pot.currentAmount / pot.target) * 100;
  const withdrawPotForm = useForm({
    resolver: zodResolver(potDepositWithdrawSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmit = (values: withdrawPotFormValues) => {
    console.log(values);
  };
  return (
    <Dialog
      open={isWithdrawOpen}
      onOpenChange={(open) => {
        // if (!isEditingPot) setIsDepositOpen(open);
        setIsWithdrawOpen(open);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="h-auto px-5 py-6 sm:max-w-[560px] sm:px-8 sm:py-8 rounded-[12px] flex flex-col gap-5"
      >
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="text-Grey-900 py-0 my-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[20px] leading-[24px] sm:text-[32px] sm:leading-[38px] tracking-[0px] font-bold">
                Withdraw from "{pot.name}"
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsWithdrawOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            AWithdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 w-full h-[114px]">
          <div className="h-[38px] w-full flex items-center justify-between">
            <span className="text-Grey-500 text-sm leading-[21px]">
              New Amount
            </span>
            <span className="text-2xl leading-[30px] text-Grey-900 sm:text-[32px] sm:leading-[38px] font-bold">
              $
              {pot.currentAmount > 0
                ? pot.currentAmount.toFixed(2)
                : pot.currentAmount}
            </span>
          </div>
          <div className="h-[39px] w-full space-y-[13px]">
            {/* Progress bar */}
            <div className="w-full rounded-[4px] bg-Beige-100 overflow-hidden h-2">
              <div
                className="rounded-[4px] h-full transition-[width] duration-500 ease-in-out bg-Grey-900"
                style={{
                  //   backgroundColor: `${pot.themeId.color}`,
                  width: `${progressValue}%`,
                }}
              ></div>
            </div>
            <div className="h-[18px] w-full flex items-center justify-between">
              <span className="text-Green text-xs leading-[18px] font-semibold">
                {progressValue.toFixed(2)}%
              </span>
              <span className="text-Grey-500 text-xs leading-[18px]">
                Target of ${pot.target.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <Form {...withdrawPotForm}>
          <form
            className="space-y-4"
            onSubmit={withdrawPotForm.handleSubmit(onSubmit)}
          >
            {/* Amount */}
            <FormField
              control={withdrawPotForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Amount to Withdraw
                  </FormLabel>
                  <FormControl className="w-full">
                    <div className="relative h-[45px]">
                      <span className="text-sm text-Grey-500 leading-[21px] absolute left-5 top-1/2 -translate-y-1/2">
                        $
                      </span>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        className="pr-5 pl-10 py-3 h-[45px] border border-Grey-300 cursor-pointer"
                        placeholder="e.g. 200"
                        required
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="w-full" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              //   disabled={isEditingPot}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {/* {isEditingPot ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : ( */}
              Confirm Withdrawal
              {/* )} */}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default WithdrawPotForm;
