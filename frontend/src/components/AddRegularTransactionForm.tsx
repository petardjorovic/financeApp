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
import { useNavigate } from "react-router-dom";

type AddTransactionFormValues = z.infer<typeof addRegularTransactionSchema>;

function AddRegularTransactionForm() {
  const navigate = useNavigate();
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
      <form
        onSubmit={regularForm.handleSubmit(onSubmitRegular)}
        className="px-1 md:px-4"
      >
        {/* Type */}
        <FormField
          control={regularForm.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
              <FormLabel className="w-60 sm:w-80 lg:w-40">Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
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
        {/* Account */}
        <FormField
          control={regularForm.control}
          name="account"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
              <FormLabel className="w-60 sm:w-80 lg:w-40">
                Recipient / Sender
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
        {/* Category */}
        {isLoading ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <FormField
            control={regularForm.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                <FormLabel className="w-60 sm:w-80 lg:w-40">Category</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    required
                  >
                    <SelectTrigger className="w-60 sm:w-80 lg:w-70 border border-Grey-300">
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
                <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
              </FormItem>
            )}
          />
        )}
        {/* Amount */}
        <FormField
          control={regularForm.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
              <FormLabel className="w-60 sm:w-80 lg:w-40">Amount</FormLabel>
              <FormControl className="w-60 sm:w-80 lg:w-70">
                <Input
                  type="number"
                  step="0.01"
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
          control={regularForm.control}
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
                  required
                  type="date"
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

export default AddRegularTransactionForm;
