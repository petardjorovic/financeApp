import { useCategories } from "@/queryHooks/useCategories";
import { useGetSingleTransaction } from "@/queryHooks/useGetSingleTransaction";
import { formatDate } from "@/utils/formatDate";
import { Loader2 } from "lucide-react";

function EditTransaction() {
  const { transaction, isLoading, isError } = useGetSingleTransaction();
  const { categories } = useCategories();
  const incomeCategories = categories.filter((cat) => cat.type === "income");
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  if (isError || !transaction)
    return (
      <div>
        <p>An error occurred</p>
      </div>
    );

  if (isLoading)
    return (
      <div>
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Edit Transaction
        </h1>
      </div>
      <p>Type: {transaction.type}</p>
      <p>Reciient / Sender: {transaction?.account}</p>
      <p>Amount: {transaction.amount}</p>
      <p>Category: {transaction.categoryId.name}</p>
      <select name="category" id="" defaultValue={transaction.categoryId._id}>
        {transaction.type === "income"
          ? incomeCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))
          : expenseCategories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
      </select>
      <p>Date: {formatDate(transaction.date)}</p>
      <p>RecurringBill: {transaction.recurringBillId ? "true" : "false"}</p>
    </main>
  );
}

export default EditTransaction;
