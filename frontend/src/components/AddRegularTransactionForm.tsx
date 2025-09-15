import { useEffect } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
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
import { Loader2Icon } from "lucide-react";
import { useCategories } from "@/queryHooks/useCategories";
import { useAddTransaction } from "@/queryHooks/useAddTransaction";
import { addRegularTransactionSchema } from "@/lib/schemas";

type AddTransactionFormValues = z.infer<typeof addRegularTransactionSchema>;

function AddRegularTransactionForm() {
  const { categories, isLoading } = useCategories();
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const regularForm = useForm({
    resolver: zodResolver(addRegularTransactionSchema),
    defaultValues: {
      isRecurring: false,
      type: "expense",
      account: "",
      amount: "",
      categoryId: "",
      date: "",
    },
  });
  const { addTx, isAddingTx } = useAddTransaction();
  const selectedType = regularForm.watch("type");

  const onSubmitRegular = (values: AddTransactionFormValues) => {
    const { account, amount, categoryId, date, type } = values;
    addTx(
      { account, amount, categoryId, date, type },
      {
        onSuccess: () => regularForm.reset(),
      }
    );
  };

  useEffect(() => {
    regularForm.setValue("categoryId", "");
  }, [selectedType, regularForm]);

  return (
    <Form {...regularForm}>
      <form onSubmit={regularForm.handleSubmit(onSubmitRegular)}>
        {/* Type */}
        <FormField
          control={regularForm.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  required
                >
                  <SelectTrigger className="w-[180px]">
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
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        {/* Account */}
        <FormField
          control={regularForm.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recipient / Sender</FormLabel>
              <FormControl>
                <Input className="px-5 py-3 h-[45px]" {...field} required />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        {/* Category */}
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <FormField
            control={regularForm.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        {selectedType === "income"
                          ? incomeCategories.map((cat) => (
                              <SelectItem value={cat._id} key={cat._id}>
                                {cat.name}
                              </SelectItem>
                            ))
                          : expenseCategories.map((cat) => (
                              <SelectItem value={cat._id} key={cat._id}>
                                {cat.name}
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
        )}
        {/* Amount */}
        <FormField
          control={regularForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter amount"
                  {...field}
                />
              </FormControl>
              <FormMessage className="mt-0" />
            </FormItem>
          )}
        />
        {/* Date */}
        <FormField
          control={regularForm.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Transaction</FormLabel>
              <FormControl>
                <Input
                  className="px-5 py-3 h-[45px]"
                  {...field}
                  required
                  type="date"
                />
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

export default AddRegularTransactionForm;
