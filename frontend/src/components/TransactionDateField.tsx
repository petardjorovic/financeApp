import type { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { formatDateWithHyphen } from "@/utils/formatDate";

type EditFormValues = {
  type: "income" | "expense";
  account: string;
  amount: string | number;
  categoryId: string;
  date: string;
  isRecurring: "true" | "false";
  recurringBillId?: string | undefined;
};

function TransactionDateField({
  form,
}: {
  form: ReturnType<typeof useForm<EditFormValues>>;
}) {
  const { control } = form;
  return (
    <FormField
      control={control}
      name="date"
      render={({ field }) => (
        <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
          <FormLabel className="w-60 sm:w-80 lg:w-40">
            Date of Transaction
          </FormLabel>
          <FormControl className="w-60 sm:w-80 lg:w-70">
            <Input
              className="px-5 py-3 h-[45px] border border-Grey-300"
              {...field}
              value={formatDateWithHyphen(field.value) ?? ""}
              required
              type="date"
            />
          </FormControl>
          <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
        </FormItem>
      )}
    />
  );
}

export default TransactionDateField;
