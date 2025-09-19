import type z from "zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { editTransactionSchema } from "@/lib/schemas";
import { useEditTransaction } from "@/queryHooks/useEditTransaction";
import { useGetSingleTransaction } from "@/queryHooks/useGetSingleTransaction";
import { formatDateWithHyphen } from "@/utils/formatDate";
import IsRecurringSelect from "@/components/IsRecurringSelect";
import RecurringBillSelect from "@/components/RecurringBillSelect";
import TransactionTypeSelect from "@/components/TransactionTypeSelect";
import TransactionAccountField from "@/components/TransactionAccountField";
import TransactionCategorySelect from "@/components/TransactionCategorySelect";
import TransactionAmountField from "@/components/TransactionAmountField";
import TransactionDateField from "@/components/TransactionDateField";
import { Loader2 } from "lucide-react";
import TransactionActionButtons from "@/components/TransactionActionButtons";
import { useRawRecurringBills } from "@/queryHooks/useRawRecurringBills";

export type EditFormValues = z.infer<typeof editTransactionSchema>;

function EditTransaction() {
  const { transaction, isError } = useGetSingleTransaction();

  const editForm = useForm({
    resolver: zodResolver(editTransactionSchema),
  });

  const { control } = editForm;
  // watch values used for conditional renders
  const selectedType = useWatch({ control, name: "type" });
  const isRecurring = useWatch({ control, name: "isRecurring" });

  // fetch recurring bills only when needed
  const { recurringBills, isRecuringLoading } =
    useRawRecurringBills(isRecurring);

  const { updateTx, isUpdatingTx } = useEditTransaction();

  const onEditFormSubmit = (values: EditFormValues) => {
    if (!transaction) return;

    const currentDateFormatted = formatDateWithHyphen(transaction.date);

    const equalBase =
      values.account === transaction.account &&
      values.type === transaction.type &&
      values.categoryId === transaction.categoryId._id &&
      values.amount === transaction.amount &&
      values.date === currentDateFormatted;

    if (values.isRecurring === "true") {
      if (equalBase && values.recurringBillId === transaction.recurringBillId)
        return;

      updateTx({
        id: transaction._id,
        account: values.account,
        amount: values.amount,
        categoryId: values.categoryId,
        date: values.date,
        recurringBillId: values.recurringBillId,
        type: values.type,
      });
    } else {
      if (equalBase) return;

      updateTx({
        id: transaction._id,
        account: values.account,
        amount: values.amount,
        categoryId: values.categoryId,
        date: values.date,
        type: values.type,
      });
    }
  };

  // clear category when type changes from initial
  useEffect(() => {
    const initialType = transaction?.type;
    if (selectedType !== initialType) {
      editForm.setValue("categoryId", "");
    }
  }, [selectedType, editForm, transaction?.type]);

  // reset when transaction arrives
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
              <IsRecurringSelect form={editForm} />
            )}
            {/* RecurringBillId */}
            {isRecurring === "true" && !isRecuringLoading && (
              <RecurringBillSelect
                form={editForm}
                recurringBills={recurringBills}
              />
            )}
            {isRecurring === "false" && (
              <>
                {/* Type */}
                <TransactionTypeSelect form={editForm} />
                {/* Account */}
                <TransactionAccountField form={editForm} />
                {/* Category */}
                <TransactionCategorySelect form={editForm} />
              </>
            )}
            {isRecurring && !isRecuringLoading && (
              <>
                {/* Amount */}
                <TransactionAmountField form={editForm} />
                {/* Date */}
                <TransactionDateField form={editForm} />
                {/* Buttons */}
                <TransactionActionButtons
                  disabled={isUpdatingTx}
                  submitBtnLabel="Edit Transaction"
                />
              </>
            )}
          </form>
        </Form>
      </div>
    </main>
  );
}

export default EditTransaction;
