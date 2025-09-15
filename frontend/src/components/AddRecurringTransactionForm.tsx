import z from "zod";
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

  return isRecuringLoading ? (
    <div className="flex items-center gap-2">
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    <Form {...recurringForm}>
      <form onSubmit={recurringForm.handleSubmit(onSubmitRecurring)}>
        {/* RecurringBillId */}
        <FormField
          control={recurringForm.control}
          name="recurringBillId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurring Bill</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => handleRecurringBillChange(value)}
                  value={field.value}
                  required
                >
                  <SelectTrigger className="w-[250px]">
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
                </Select>
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        {/* Amount */}
        <FormField
          control={recurringForm.control}
          name={"amount"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input type="number" step={"0.01"} {...field} />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        {/* Date */}
        <FormField
          control={recurringForm.control}
          name={"date"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isAddingTx}>
          {isAddingTx ? (
            <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default AddRecurringTransactionForm;
