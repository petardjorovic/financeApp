import z from "zod";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getRawRecurringBills, type RecurringBill } from "@/lib/api";
import { addRecurringTransactionSchema } from "@/lib/schemas";
import { useAddTransaction } from "@/queryHooks/useAddTransaction";
import { Loader2, Loader2Icon } from "lucide-react";

type AddTransactionFormValues = z.infer<typeof addRecurringTransactionSchema>;

function AddRecurringTransactionForm() {
  const navigate = useNavigate();
  const { addTx, isAddingTx } = useAddTransaction();
  const recurringForm = useForm({
    resolver: zodResolver(addRecurringTransactionSchema),
    defaultValues: {
      isRecurring: true,
      type: "expense",
      account: "",
      amount: "",
      categoryId: "",
      date: "",
      recurringBillId: "",
    },
  });
  const { data: recurringBills, isLoading: isRecuringLoading } = useQuery<
    RecurringBill[],
    Error
  >({
    queryKey: ["rawRecurringBills"],
    queryFn: getRawRecurringBills,
    enabled: recurringForm.getValues("isRecurring"),
  });
  console.log(recurringBills);

  const onSubmitRecurring = (values: AddTransactionFormValues) => {
    const { amount, account, type, categoryId, date, recurringBillId } = values;
    addTx(
      { amount, account, date, categoryId, type, recurringBillId },
      {
        onSuccess: () => recurringForm.reset(),
      }
    );
  };
  const handleRecurringBillChange = (billId: string) => {
    const selectedBill = recurringBills?.find((bill) => bill._id === billId);
    if (!selectedBill) return;

    recurringForm.setValue("type", "expense");
    recurringForm.setValue("recurringBillId", selectedBill._id, {
      shouldValidate: true,
    });
    recurringForm.setValue("account", selectedBill.name);
    recurringForm.setValue("categoryId", selectedBill.categoryId);
  };

  return (
    <Form {...recurringForm}>
      <form
        onSubmit={recurringForm.handleSubmit(onSubmitRecurring)}
        className="px-1 md:px-4"
      >
        {/* RecurringBillId */}

        <FormField
          control={recurringForm.control}
          name="recurringBillId"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
              <FormLabel className="w-60 sm:w-80 lg:w-40">
                Recurring Bill
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => handleRecurringBillChange(value)}
                  value={field.value}
                  required
                >
                  {isRecuringLoading ? (
                    <div className="w-60 sm:w-80 lg:w-70 flex items-center justify-center">
                      <Loader2 className="animate-spin" />
                    </div>
                  ) : (
                    <>
                      <SelectTrigger className="w-60 sm:w-80 lg:w-70 border border-Grey-300">
                        <SelectValue placeholder="Choose recurring bill" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Recurring Bill</SelectLabel>
                          {recurringBills?.map((rec) => (
                            <SelectItem value={rec._id} key={rec._id}>
                              {rec.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </>
                  )}
                </Select>
              </FormControl>
              <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
            </FormItem>
          )}
        />

        {/* Amount */}
        <FormField
          control={recurringForm.control}
          name={"amount"}
          render={({ field }) => (
            <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
              <FormLabel className="w-60 sm:w-80 lg:w-40">Amount</FormLabel>
              <FormControl className="w-60 sm:w-80 lg:w-70">
                <Input
                  type="number"
                  step={"0.01"}
                  {...field}
                  className="px-5 py-3 h-[45px] border border-Grey-300"
                />
              </FormControl>
              <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
            </FormItem>
          )}
        />
        {/* Date */}
        <FormField
          control={recurringForm.control}
          name={"date"}
          render={({ field }) => (
            <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
              <FormLabel className="w-60 sm:w-80 lg:w-40">Date</FormLabel>
              <FormControl className="w-60 sm:w-80 lg:w-70">
                <Input
                  type="date"
                  {...field}
                  className="px-5 py-3 h-[45px] border border-Grey-300"
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
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isAddingTx}
            className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] w-42 sm:w-50"
          >
            {isAddingTx ? (
              <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create New Transaction"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AddRecurringTransactionForm;
