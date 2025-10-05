import type { Transaction } from "@/lib/types";
import OverviewCardHeader from "./OverviewCardHeader";
import income from "../assets/images/income.png";
import expense from "../assets/images/expense.png";
import { formatDate } from "@/utils/formatDate";

function TransactionsOverviewCard({
  transactions,
}: {
  transactions: Transaction[] | undefined;
}) {
  return (
    <div className="px-5 py-6 flex flex-col gap-5 sm:p-8 sm:gap-8 bg-white rounded-[12px]">
      {/* Transactions Title */}
      <OverviewCardHeader label="Transactions" url="/transactions" />
      <div className="w-full">
        {transactions?.length ? (
          transactions?.map((t) => (
            <div
              key={t._id}
              className="w-full h-[87px] flex items-center justify-between first:h-[67px] last:h-[67px] first:items-start last:items-end not-last:border-b not-last:border-b-Grey-100"
            >
              <div className="flex gap-4 items-center">
                {t.type === "income" ? (
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
                <span className="text-sm font-semibold text-Grey-900">
                  {t.account}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className={`text-sm font-semibold text-right ${
                    t.type === "expense" ? "text-Grey-900" : "text-Green"
                  }`}
                >
                  {t.type === "expense" ? "-" : "+"}${t.amount.toFixed(2)}
                </span>
                <span className="text-Grey-500 text-xs leading-[18px] text-right">
                  {formatDate(t.date)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-sm text-Grey-500 rounded-[12px] border border-Beige-100 py-10">
            You haven't added any Transactions yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default TransactionsOverviewCard;
