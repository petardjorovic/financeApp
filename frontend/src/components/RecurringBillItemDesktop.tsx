import type { RecurringBill } from "@/lib/types";
import expense from "../assets/images/expense.png";
import { MoreVertical } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { getOrderDayAbbr } from "@/utils/getOrderDayAbbr";
import RecurringBillMoreMenu from "./RecurringBillMoreMenu";

function RecurringBillItemDesktop({
  recurringBill,
}: {
  recurringBill: RecurringBill;
}) {
  const isDueSoon = (dueDate: number): boolean => {
    return (
      dueDate - new Date().getDate() < 5 &&
      dueDate - new Date().getDate() > 0 &&
      !recurringBill.isPaidThisMonth
    );
  };
  return (
    <tr
      key={recurringBill._id}
      className="border-b border-Grey-100 last:border-none"
    >
      {/* Bill title */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-4">
          <img
            src={expense}
            alt="expense"
            className="w-10 h-10 rounded-full bg-Red object-cover"
          />

          <span className="px-4 py-3 text-Grey-900 text-sm leading-[21px] font-semibold">
            {recurringBill.name}
          </span>
        </div>
      </td>

      {/* Due Date */}
      <td
        className={`px-4 py-3 text-xs leading-[18px] ${
          recurringBill.isPaidThisMonth ? "text-Green" : "text-Grey-500"
        }`}
      >
        Monthly-{recurringBill.dueDate}
        {getOrderDayAbbr(recurringBill.dueDate)}
        {isDueSoon(recurringBill.dueDate) ? (
          <FaCircleExclamation
            color="#c94736"
            className="w-4 h-4 ml-2 inline"
          />
        ) : recurringBill.isPaidThisMonth ? (
          <FaCircleCheck color="#277c78" className="w-4 h-4 ml-2 inline" />
        ) : (
          ""
        )}
      </td>

      {/* Amount */}
      <td className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-sm leading-[21px] font-semibold text-Grey-900">
            ${recurringBill.paidAmountThisMonth.toFixed(2)}
          </span>
          <RecurringBillMoreMenu
            name={recurringBill.name}
            recurringBillId={recurringBill._id}
          />
        </div>
      </td>
    </tr>
  );
}

export default RecurringBillItemDesktop;
