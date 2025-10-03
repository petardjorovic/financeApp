import type { RecurringBill } from "@/lib/types";
import expense from "../assets/images/expense.png";
import { getOrderDayAbbr } from "@/utils/getOrderDayAbbr";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import RecurringBillMoreMenu from "./RecurringBillMoreMenu";

function RecurringBillItemMobile({
  recurringBill,
}: {
  recurringBill: RecurringBill;
}) {
  const isDueSoon =
    recurringBill.dueDate - new Date().getDate() < 5 &&
    !recurringBill.isPaidThisMonth;

  return (
    <div
      key={recurringBill._id}
      className="flex items-center w-full justify-between pb-4 border-b pt-4 border-b-Grey-100 gap-x-1 first:pt-0 last:border-none"
    >
      <div className="flex gap-x-3 items-center max-w-[191px]">
        <img
          src={expense}
          alt="expense"
          className="w-8 h-8 bg-Red rounded-full"
        />

        <div className="flex flex-col gap-y-1">
          <p className="text-Grey-900 text-sm font-semibold leading-[21px]">
            {recurringBill.name}
          </p>
          <p
            className={`text-xs leading-[18px] ${
              recurringBill.isPaidThisMonth ? "text-Green" : "text-Grey-500"
            }`}
          >
            Monthly-{recurringBill.dueDate}
            {getOrderDayAbbr(recurringBill.dueDate)}
            {isDueSoon ? (
              <FaCircleExclamation
                color="#c94736"
                className="w-4 h-4 ml-2 inline"
              />
            ) : recurringBill.isPaidThisMonth ? (
              <FaCircleCheck color="#277c78" className="w-4 h-4 ml-2 inline" />
            ) : (
              ""
            )}
          </p>
        </div>
      </div>
      <div className="flex gap-x-3 items-center">
        <div className="flex flex-col gap-y-1">
          <span
            className={`text-sm leading-[21px] font-semibold text-Grey-900 ${
              isDueSoon ? "text-Red" : "text-Grey-900"
            }`}
          >
            {recurringBill.paidAmountThisMonth > 0
              ? "$" + recurringBill.paidAmountThisMonth.toFixed(2)
              : "-"}
          </span>
          {!recurringBill.isPaidThisMonth && (
            <span
              className={`text-[10px] text-right ${
                isDueSoon ? "text-Red" : "text-Grey-500"
              }`}
            >
              ${recurringBill.lastTransactionAmount.toFixed(2)}
            </span>
          )}
        </div>
        <RecurringBillMoreMenu
          name={recurringBill.name}
          recurringBillId={recurringBill._id}
        />
      </div>
    </div>
  );
}

export default RecurringBillItemMobile;
