import type { Transaction } from "@/lib/api";
import income from "../assets/images/income.png";
import expense from "../assets/images/expense.png";
import { MoreVertical } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

function TransactionaTable({ transactions }: { transactions: Transaction[] }) {
  console.log(transactions);

  return (
    <div className="w-full ">
      {/* DESKTOP VIEW */}
      <div className="hidden md:block overflow-x-auto">
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
                className="border-b border-Grey-100 hover:bg-Grey-100 transition"
              >
                {/* Recipient / Sender */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-4">
                    {item.type === "income" ? (
                      <img
                        src={income}
                        alt="income"
                        className="w-8 h-8 rounded-full bg-Green object-cover"
                      />
                    ) : (
                      <img
                        src={expense}
                        alt="expense"
                        className="w-8 h-8 rounded-full bg-Red object-cover"
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
                    <MoreVertical
                      size={18}
                      className="text-Grey-900 cursor-pointer hover:text-Grey-500"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionaTable;

/*
<table>
      <thead className="h-[42px] px-4 py-3 border-b border-b-Grey-100">
        <tr>
          <th className="text-xs font-normal leading-[18px] text-Grey-500 w-[272px] lg:max-w-[428px] h-[18px] text-left border">
            Recipient / Sender
          </th>
          <th className="text-xs font-normal leading-[18px] text-Grey-500 w-[272px] lg:max-w-[428px] h-[18px] text-left border">
            Category
          </th>
          <th className="text-xs font-normal leading-[18px] text-Grey-500 w-[272px] lg:max-w-[428px] h-[18px] text-left border">
            Transaction Date
          </th>
          <th className="text-xs font-normal leading-[18px] text-Grey-500 w-[272px] lg:max-w-[428px] h-[18px] text-left border">
            Amount
          </th>
        </tr>
      </thead>
      <tbody className="">
        {transactions.map((item) => (
          <tr key={item._id} className="">
            <td className="h-[56px] pb-4 border flex items-center gap-4">
              {item.type === "income" ? (
                <img
                  src={income}
                  alt=""
                  className="bg-Green rounded-full w-10 h-10"
                />
              ) : (
                <img
                  src={expense}
                  alt=""
                  className="bg-Red rounded-full w-10 h-10"
                />
              )}{" "}
              <span className="text-Grey-900 text-sm leading-[21px] font-semibold">
                {item.account}
              </span>
            </td>
            <td className="border h-[56px] pb-4 text-xs text-Grey-500 leading-[18px]">
              {item.categoryId.name}
            </td>
            <td className="border h-[56px] pb-4 text-xs text-Grey-500 leading-[18px]">
              {formatDate(item.date)}
            </td>
            <td className="h-[56px] pb-4 border flex items-center justify-between">
              {item.type === "income" ? (
                <span className="text-Green text-sm leading-[21px] font-semibold">
                  +${item.amount}
                </span>
              ) : (
                <span className="text-Grey-900 text-sm leading-[21px] font-semibold">
                  -${item.amount}
                </span>
              )}
              <MoreVertical color="#201f24" size={20} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    */
