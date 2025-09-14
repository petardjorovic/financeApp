import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs } from "@/components/ui/tabs";
import { getRecurringBills, type RecurringBill } from "@/lib/api";
import { addTransactionSchema } from "@/lib/schemas";
import { useAddTransaction } from "@/queryHooks/useAddTransaction";
import { useCategories } from "@/queryHooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type z from "zod";

type AddTransactionFormValues = z.infer<typeof addTransactionSchema>;

function AddTransaction() {
  const { categories, isLoading } = useCategories();
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");
  const regularForm = useForm({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      isRecurring: false,
      type: "income",
      account: "",
      amount: "",
      categoryId: "",
      date: "",
      recurringBillId: "",
    },
  });

  const recurringForm = useForm({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      isRecurring: false,
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
    queryKey: ["recurringBills"],
    queryFn: getRecurringBills,
    enabled: regularForm.watch("isRecurring"),
  });
  const { addTx, isAddingTx } = useAddTransaction();
  const selectedType = regularForm.watch("type");

  const onSubmitRegular = (values: AddTransactionFormValues) => {
    const { amount, date, account, categoryId, type } = values;
    if (!amount || !date || !account || !categoryId || !type) return;
    addTx(
      { amount, account, date, categoryId, type },
      {
        onSuccess: () => regularForm.reset(),
      }
    );
  };

  const onSubmitRecurring = (values: AddTransactionFormValues) => {
    const { amount, account, type, categoryId, date, recurringBillId } = values;
    if (
      !amount ||
      !date ||
      !account ||
      !categoryId ||
      !type ||
      !recurringBillId
    )
      return;
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
    recurringForm.setValue("recurringBillId", selectedBill._id);
    recurringForm.setValue("account", selectedBill.name);
    recurringForm.setValue("categoryId", selectedBill.categoryId);
  };

  useEffect(() => {
    regularForm.setValue("categoryId", "");
  }, [selectedType, regularForm]);

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Add Transaction
        </h1>
      </div>
      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 bg-Grey-300 rounded-sm p-1">
          <TabsTrigger
            value="regular"
            className={`w-auto rounded-sm ${
              !regularForm.watch("isRecurring") ? "bg-White" : ""
            }`}
            onClick={() => regularForm.setValue("isRecurring", false)}
          >
            Regular tx
          </TabsTrigger>
          <TabsTrigger
            value="recurring"
            className={`w-auto rounded-sm ${
              regularForm.watch("isRecurring") ? "bg-White" : ""
            }`}
            onClick={() => regularForm.setValue("isRecurring", true)}
          >
            Recurring tx
          </TabsTrigger>
        </TabsList>
        <TabsContent value="regular" className="mt-4">
          {/* Regular Form */}
          <div>
            <Form {...regularForm}>
              <form onSubmit={regularForm.handleSubmit(onSubmitRegular)}>
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
                <FormField
                  control={regularForm.control}
                  name="account"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient / Sender</FormLabel>
                      <FormControl>
                        <Input
                          className="px-5 py-3 h-[45px]"
                          {...field}
                          required
                        />
                      </FormControl>
                      <FormMessage className="mt-0" />
                    </FormItem>
                  )}
                />
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
                  Add {isAddingTx && <Loader2 className="animate-spin" />}
                </Button>
              </form>
            </Form>
          </div>
        </TabsContent>

        {/* RECURRING FORM */}
        <TabsContent value="recurring" className="mt-4">
          <div>
            {isRecuringLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <Form {...recurringForm}>
                <form onSubmit={recurringForm.handleSubmit(onSubmitRecurring)}>
                  <FormField
                    control={recurringForm.control}
                    name="recurringBillId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Recurring Bill</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) =>
                              handleRecurringBillChange(value)
                            }
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
                    Add {isAddingTx && <Loader2 className="animate-spin" />}
                  </Button>
                </form>
              </Form>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default AddTransaction;
