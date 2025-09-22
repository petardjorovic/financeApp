import type { Transaction } from "@/lib/api";
import { formatDate } from "@/utils/formatDate";
import TransactionMoreMenu from "./TransactionMoreMenu";
import income from "../assets/images/income.png";
import expense from "../assets/images/expense.png";

function TransactionItemDesktop({ transaction }: { transaction: Transaction }) {
  return (
    <tr
      key={transaction._id}
      className="border-b border-Grey-100 last:border-none"
    >
      {/* Recipient / Sender */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          {transaction.type === "income" ? (
            <img
              src={income}
              alt="income"
              className="w-10 h-10 rounded-full bg-Green object-cover"
            />
          ) : (
            <img
              src={expense}
              alt="expense"
              className="w-10 h-10 rounded-full bg-Red object-cover"
            />
          )}

          <span className="px-4 py-3 text-Grey-900 text-sm leading-[21px] font-semibold">
            {transaction.account}
          </span>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3 text-xs text-Grey-500 leading-[18px]">
        {transaction.categoryId.name}
      </td>

      {/* Date */}
      <td className="px-4 py-3 text-xs text-Grey-500 leading-[18px]">
        {formatDate(transaction.date)}
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <span
            className={`text-sm leading-[21px] font-semibold ${
              transaction.type === "income" ? "text-Green" : "text-Grey-900"
            }`}
          >
            {transaction.type === "income" ? "+$" : "-$"}
            {transaction.amount}
          </span>
          <TransactionMoreMenu
            transactionId={transaction._id}
            account={transaction.account}
          />
        </div>
      </td>
    </tr>
  );
}

export default TransactionItemDesktop;
