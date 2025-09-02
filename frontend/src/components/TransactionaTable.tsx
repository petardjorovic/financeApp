import type { Transaction } from "@/lib/api";
import income from "../assets/images/income.png";
import expense from "../assets/images/expense.png";
import { MoreVertical } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

function TransactionaTable({ transactions }: { transactions: Transaction[] }) {
  console.log(transactions);

  return (
    <div className="w-full">
      {/* DESKTOP VIEW */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          {/* Header */}
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

          {/* Body */}
          <tbody>
            {transactions.map((item) => (
              <tr
                key={item._id}
                className="border-b border-Grey-100 last:border-none"
              >
                {/* Recipient / Sender */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    {item.type === "income" ? (
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
                      {item.account}
                    </span>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4 py-3 text-xs text-Grey-500 leading-[18px]">
                  {item.categoryId.name}
                </td>

                {/* Date */}
                <td className="px-4 py-3 text-xs text-Grey-500 leading-[18px]">
                  {formatDate(item.date)}
                </td>

                {/* Amount */}
                <td className="px-4 py-3">
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className={`text-sm leading-[21px] font-semibold ${
                        item.type === "income" ? "text-Green" : "text-Grey-900"
                      }`}
                    >
                      {item.type === "income" ? "+$" : "-$"}
                      {item.amount}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <MoreVertical
                          size={18}
                          className="text-Grey-900 cursor-pointer hover:text-Grey-500"
                        />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* SMALL SCREEN VIEW */}
      <div className="sm:hidden w-full">
        {transactions.map((item) => (
          <div
            key={item._id}
            className="flex items-center w-full justify-between pb-4 border-b pt-4 border-b-Grey-100 gap-x-1 first:pt-0 last:border-none"
          >
            <div className="flex gap-x-3 items-center max-w-[191px]">
              {item.type === "income" ? (
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
                  {item.account}
                </p>
                <p className="text-Grey-500 text-xs leading-[18px]">
                  {item.categoryId.name}
                </p>
              </div>
            </div>
            <div className="flex gap-x-2 items-center">
              <div className="flex flex-col gap-y-1">
                <p
                  className={`text-sm leading-[21px] font-semibold ${
                    item.type === "income" ? "text-Green" : "text-Grey-900"
                  }`}
                >
                  {item.type === "income" ? "+$" : "-$"}
                  {item.amount}
                </p>
                <p className="text-Grey-500 text-xs leading-[18px]">
                  {formatDate(item.date)}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreVertical
                    size={18}
                    className="text-Grey-900 cursor-pointer hover:text-Grey-500"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto" align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionaTable;
