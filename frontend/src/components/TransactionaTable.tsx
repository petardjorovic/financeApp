import TransactionItemDesktop from "./TransactionItemDesktop";
import TransactionItemMobile from "./TransactionItemMobile";
import type { Transaction } from "@/lib/api";

function TransactionaTable({ transactions }: { transactions: Transaction[] }) {
  console.log(transactions);

  return (
    <div className="w-full">
      {/* DESKTOP VIEW */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-White border-b border-b-Grey-100">
            <tr>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Recipient / Sender
              </th>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Category
              </th>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Transaction Date
              </th>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((item) => (
              <TransactionItemDesktop transaction={item} />
            ))}
          </tbody>
        </table>
      </div>

      {/* SMALL SCREEN VIEW */}
      <div className="sm:hidden w-full">
        {transactions.map((item) => (
          <TransactionItemMobile transaction={item} />
        ))}
      </div>
    </div>
  );
}

export default TransactionaTable;
