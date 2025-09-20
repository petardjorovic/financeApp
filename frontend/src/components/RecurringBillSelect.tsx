import type { useForm } from "react-hook-form";
import {
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
import type { RecurringBill } from "@/lib/api";

type EditFormValues = {
  type: "income" | "expense";
  account: string;
  amount: string | number;
  categoryId: string;
  date: string;
  isRecurring: "true" | "false";
  recurringBillId?: string | undefined;
};

function RecurringBillSelect({
  form,
  recurringBills,
}: {
  form: ReturnType<typeof useForm<EditFormValues>>;
  recurringBills?: RecurringBill[];
}) {
  const { control, setValue } = form;

  const handleRecurringBillChange = (billId: string) => {
    const selectedBill = recurringBills?.find((bill) => bill._id === billId);
    if (!selectedBill) return;

    setValue("type", "expense");
    setValue("recurringBillId", selectedBill._id, {
      shouldValidate: true,
    });
    setValue("account", selectedBill.name);
    setValue("categoryId", selectedBill.categoryId);
  };
  return (
    <FormField
      control={control}
      name="recurringBillId"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
          <FormLabel className="w-60 sm:w-80 lg:w-40">Recurring Bill</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => handleRecurringBillChange(value)}
              value={field.value ?? ""}
              required
            >
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
            </Select>
          </FormControl>
          <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
        </FormItem>
      )}
    />
  );
}

export default RecurringBillSelect;
