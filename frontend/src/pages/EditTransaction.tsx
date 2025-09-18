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
import { getRawRecurringBills, type RecurringBill } from "@/lib/api";
import { editTransactionSchema } from "@/lib/schemas";
import { useCategories } from "@/queryHooks/useCategories";
import { useEditTransaction } from "@/queryHooks/useEditTransaction";
import { useGetSingleTransaction } from "@/queryHooks/useGetSingleTransaction";
import { formatDateWithHyphen } from "@/utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Loader2Icon } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type z from "zod";

type EditFormValues = z.infer<typeof editTransactionSchema>;

function EditTransaction() {
  const navigate = useNavigate();
  const { transaction, isError } = useGetSingleTransaction();

  const { categories } = useCategories();
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const editForm = useForm({
    resolver: zodResolver(editTransactionSchema),
  });
  const { data: recurringBills, isLoading: isRecuringLoading } = useQuery<
    RecurringBill[],
    Error
  >({
    queryKey: ["rawRecurringBills"],
    queryFn: getRawRecurringBills,
    enabled: editForm.getValues("isRecurring") === "true",
  });
  const { updateTx, isUpdatingTx } = useEditTransaction();
  const selectedType = editForm.watch("type");
  const isRecurring = editForm.watch("isRecurring");

  const onEditFormSubmit = (values: EditFormValues) => {
    if (!transaction) return;

    if (values.isRecurring === "true") {
      if (
        values.account === transaction.account &&
        values.type === transaction.type &&
        values.categoryId === transaction.categoryId._id &&
        values.amount === transaction.amount &&
        values.date === formatDateWithHyphen(transaction.date) &&
        values.recurringBillId === transaction.recurringBillId
      ) {
        console.log("sve isto");
        return;
      } else {
        const { account, amount, categoryId, date, recurringBillId, type } =
          values;
        updateTx({
          id: transaction._id,
          account,
          amount,
          categoryId,
          date,
          recurringBillId,
          type,
        });
      }
    } else {
      if (
        values.account === transaction.account &&
        values.type === transaction.type &&
        values.categoryId === transaction.categoryId._id &&
        values.amount === transaction.amount &&
        values.date === formatDateWithHyphen(transaction.date)
      ) {
        console.log("sve isto");
        return;
      } else {
        const { account, amount, categoryId, date, type } = values;
        updateTx({
          id: transaction._id,
          account,
          amount,
          categoryId,
          date,
          type,
        });
      }
    }
  };

  const handleRecurringBillChange = (billId: string) => {
    const selectedBill = recurringBills?.find((bill) => bill._id === billId);
    if (!selectedBill) return;

    editForm.setValue("type", "expense");
    editForm.setValue("recurringBillId", selectedBill._id, {
      shouldValidate: true,
    });
    editForm.setValue("account", selectedBill.name);
    editForm.setValue("categoryId", selectedBill.categoryId);
  };

  useEffect(() => {
    const initialType = transaction?.type;
    if (selectedType !== initialType) {
      editForm.setValue("categoryId", "");
    }
  }, [selectedType, editForm, transaction?.type]);

  useEffect(() => {
    if (transaction) {
      editForm.reset({
        isRecurring: transaction.recurringBillId ? "true" : "false",
        account: transaction.account,
        amount: transaction.amount,
        type: transaction.type,
        categoryId: transaction.categoryId._id,
        date: formatDateWithHyphen(transaction.date),
        recurringBillId: transaction.recurringBillId ?? "",
      });
    }
  }, [transaction, editForm]);

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Edit Transaction
        </h1>
      </div>
      <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
        {isError && (
          <div className="flex justify-center items-center h-full">
            <p>An error occurred!</p>
          </div>
        )}
        {(!transaction || isRecuringLoading) && !isError && (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" />
          </div>
        )}
        <Form {...editForm}>
          <form
            className="px-1 md:px-4 flex flex-col h-full"
            onSubmit={editForm.handleSubmit(onEditFormSubmit)}
          >
            {/* isRecurring */}
            {selectedType === "expense" && !isRecuringLoading && (
              <FormField
                name="isRecurring"
                control={editForm.control}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      Is recurring transaction
                    </FormLabel>
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
                            <SelectLabel>Is recurring</SelectLabel>
                            <SelectItem value={"true"}>Yes</SelectItem>
                            <SelectItem value={"false"}>No</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {/* RecurringBillId */}
            {isRecurring === "true" && !isRecuringLoading && (
              <FormField
                control={editForm.control}
                name="recurringBillId"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                    <FormLabel className="w-60 sm:w-80 lg:w-40">
                      Recurring Bill
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          handleRecurringBillChange(value)
                        }
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
            )}
            {isRecurring === "false" && (
              <>
                {/* Type */}
                <FormField
                  control={editForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                      <FormLabel className="w-60 sm:w-80 lg:w-40">
                        Type
                      </FormLabel>
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
                {/* Account */}
                <FormField
                  control={editForm.control}
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
                          value={field.value ?? ""}
                          required
                        />
                      </FormControl>
                      <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                    </FormItem>
                  )}
                />
                {/* Category */}
                <FormField
                  control={editForm.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                      <FormLabel className="w-60 sm:w-80 lg:w-40">
                        Category
                      </FormLabel>
                      <FormControl>
                        {categories.length > 0 ? (
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
                        ) : (
                          <Loader2 className="animate-spin" />
                        )}
                      </FormControl>
                      <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                    </FormItem>
                  )}
                />
              </>
            )}
            {/* Amount */}
            {isRecurring && !isRecuringLoading && (
              <>
                <FormField
                  control={editForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center lg:flex lg:flex-row lg:gap-x-5 xl:gap-x-15 lg:border-b lg:border-b-Grey-100 py-3">
                      <FormLabel className="w-60 sm:w-80 lg:w-40">
                        Amount
                      </FormLabel>
                      <FormControl className="w-60 sm:w-80 lg:w-70">
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          value={field.value ?? 0}
                          className="px-5 py-3 h-[45px] border border-Grey-300"
                        />
                      </FormControl>
                      <FormMessage className="lg:py-3 w-60 sm:w-80 lg:w-70" />
                    </FormItem>
                  )}
                />
                {/* Date */}
                <FormField
                  control={editForm.control}
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

                <div className="flex py-3 gap-x-3 justify-center lg:justify-end">
                  <Button
                    className="text-White bg-Red rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] hover:bg-Red/70"
                    type="button"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUpdatingTx}
                    className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[45px] w-42 sm:w-50"
                  >
                    {isUpdatingTx ? (
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Edit Transaction"
                    )}
                  </Button>
                </div>
              </>
            )}
          </form>
        </Form>
      </div>
    </main>
  );
}

export default EditTransaction;
