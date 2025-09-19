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
import type { useForm } from "react-hook-form";

type EditFormValues = {
  type: "income" | "expense";
  account: string;
  amount: string | number;
  categoryId: string;
  date: string;
  isRecurring: "true" | "false";
  recurringBillId?: string | undefined;
};

function TransactionTypeSelect({
  form,
}: {
  form: ReturnType<typeof useForm<EditFormValues>>;
}) {
  const { control } = form;
  return (
    <FormField
      control={control}
      name="type"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
          <FormLabel className="w-60 sm:w-80 lg:w-40">Type</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value ?? ""}
              required
            >
              <SelectTrigger className="w-60 sm:w-80 lg:w-70 border border-Grey-300">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Type</SelectLabel>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
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

export default TransactionTypeSelect;
