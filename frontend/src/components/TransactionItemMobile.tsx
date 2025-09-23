import income from "../assets/images/income.png";
import expense from "../assets/images/expense.png";
import { formatDate } from "@/utils/formatDate";
import TransactionMoreMenu from "./TransactionMoreMenu";
import type { Transaction } from "@/lib/types";

function TransactionItemMobile({ transaction }: { transaction: Transaction }) {
  return (
    <div
      key={transaction._id}
      className="flex items-center w-full justify-between pb-4 border-b pt-4 border-b-Grey-100 gap-x-1 first:pt-0 last:border-none"
    >
      <div className="flex gap-x-3 items-center max-w-[191px]">
        {transaction.type === "income" ? (
          <img
            src={income}
            alt="income"
            className="w-8 h-8 bg-Green rounded-full"
          />
        ) : (
          <img
            src={expense}
            alt="expense"
            className="w-8 h-8 bg-Red rounded-full"
          />
        )}
        <div className="flex flex-col gap-y-1">
          <p className="text-Grey-900 text-sm font-semibold leading-[21px]">
            {transaction.account}
          </p>
          <p className="text-Grey-500 text-xs leading-[18px]">
            {transaction.categoryId.name}
          </p>
        </div>
      </div>
      <div className="flex gap-x-2 items-center">
        <div className="flex flex-col gap-y-1">
          <p
            className={`text-sm leading-[21px] font-semibold ${
              transaction.type === "income" ? "text-Green" : "text-Grey-900"
            }`}
          >
            {transaction.type === "income" ? "+$" : "-$"}
            {transaction.amount}
          </p>
          <p className="text-Grey-500 text-xs leading-[18px]">
            {formatDate(transaction.date)}
          </p>
        </div>
        <TransactionMoreMenu
          transactionId={transaction._id}
          account={transaction.account}
        />
      </div>
    </div>
  );
}

export default TransactionItemMobile;
