import { potDepositWithdrawSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import type z from "zod";
import type { Pot } from "@/lib/types";
import { useDepositPot } from "@/queryHooks/useDepositPot";
import { Loader2Icon } from "lucide-react";
import { useEffect } from "react";

type Props = {
  isDepositOpen: boolean;
  setIsDepositOpen: React.Dispatch<React.SetStateAction<boolean>>;
  pot: Pot;
  currentBalance: number | undefined;
};

type depositPotFormValues = z.infer<typeof potDepositWithdrawSchema>;

function DepositPotForm({
  isDepositOpen,
  setIsDepositOpen,
  pot,
  currentBalance,
}: Props) {
  const { addPotDeposit, isPending: isAddingDeposit } =
    useDepositPot(setIsDepositOpen);
  const progressValue = (pot.currentAmount / pot.target) * 100;
  const depositPotForm = useForm({
    resolver: zodResolver(
      potDepositWithdrawSchema.refine(
        (data) => data.amount <= (currentBalance ?? 0),
        {
          message: `Insufficient funds. Your current balance is $${currentBalance?.toFixed(
            2
          )}`,
          path: ["amount"],
        }
      )
    ),
    defaultValues: {
      amount: "",
    },
  });
  const { control } = depositPotForm;
  const currentAmount = useWatch({ control, name: "amount" });

  const getDepositWidth = (
    progressValue: number,
    depositAmount: number,
    target: number
  ) => {
    const depositPercent = (depositAmount / target) * 100;
    if (depositPercent + progressValue > 100) {
      return 100 - progressValue;
    }

    return depositPercent;
  };

  const onSubmit = (values: depositPotFormValues) => {
    addPotDeposit({ potId: pot._id, amount: values.amount });
  };

  useEffect(() => {
    if (!isDepositOpen) {
      depositPotForm.reset({
        amount: "",
      });
    }
  }, [depositPotForm, isDepositOpen]);

  return (
    <Dialog
      open={isDepositOpen}
      onOpenChange={(open) => {
        if (!isAddingDeposit) setIsDepositOpen(open);
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
                Add to "{pot.name}"
              </span>
              <IoIosCloseCircleOutline
                className="fill-Grey-500 w-[25px] h-[25px] cursor-pointer"
                onClick={() => setIsDepositOpen(false)}
              />
            </div>
          </DialogTitle>
          <DialogDescription className="text-sm leading-[21px] text-Grey-500 py-0 my-0">
            Add money to your pot to keep it separete from your main balance. As
            soon as you add this money, it will be deducted from your current
            balance.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 w-full h-[114px]">
          <div className="h-[38px] w-full flex items-center justify-between">
            <span className="text-Grey-500 text-sm leading-[21px]">
              New Amount
            </span>
            <span className="text-2xl leading-[30px] text-Grey-900 sm:text-[32px] sm:leading-[38px] font-bold">
              $
              {currentAmount
                ? (pot.currentAmount + +currentAmount).toFixed(2)
                : pot.currentAmount > 0
                ? pot.currentAmount.toFixed(2)
                : pot.currentAmount}
            </span>
          </div>
          <div className="h-[39px] w-full space-y-[13px]">
            {/* Progress bar */}
            <div className="w-full rounded-[4px] flex gap-[2px] items-center bg-Beige-100 overflow-hidden h-2">
              <div
                className={`rounded-l-[4px] h-full transition-[width] duration-500 ease-in-out bg-Grey-900`}
                style={{
                  width: `${progressValue}%`,
                }}
              ></div>
              {currentAmount && (
                <div
                  className={`rounded-r-[4px] h-full transition-[width] duration-500 ease-in-out bg-Green ${
                    pot.currentAmount <= 0 ? "rounded-l-[4px]" : ""
                  }`}
                  style={{
                    width: `${getDepositWidth(
                      progressValue,
                      +currentAmount,
                      pot.target
                    )}%`,
                  }}
                ></div>
              )}
            </div>
            <div className="h-[18px] w-full flex items-center justify-between">
              <span
                className={`text-xs leading-[18px] font-semibold ${
                  currentAmount ? "text-Green" : "text-Grey-900"
                }`}
              >
                {currentAmount
                  ? (
                      ((pot.currentAmount + +currentAmount) / pot.target) *
                      100
                    ).toFixed(2)
                  : progressValue.toFixed(2)}
                %
              </span>
              <span className="text-Grey-500 text-xs leading-[18px]">
                Target of ${pot.target.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <Form {...depositPotForm}>
          <form
            className="space-y-4"
            onSubmit={depositPotForm.handleSubmit(onSubmit)}
          >
            {/* Amount */}
            <FormField
              control={depositPotForm.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="w-full gap-1">
                  <FormLabel className="w-full text-xs text-Grey-500 leading-[18px] font-semibold my-0">
                    Amount to Add
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
              disabled={isAddingDeposit}
              className="w-full mt-5 h-[53px] rounded-[8px] bg-Grey-900 text-White p-4 text-sm font-semibold cursor-pointer"
            >
              {isAddingDeposit ? (
                <Loader2Icon className=" h-4 w-4 animate-spin" />
              ) : (
                "Confirm Addition"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default DepositPotForm;
