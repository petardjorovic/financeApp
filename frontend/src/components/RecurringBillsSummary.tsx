import type { RecurringBill } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function RecurringBillsSummary({
  recurringBills,
}: {
  recurringBills: RecurringBill[];
}) {
  const paidBills = recurringBills.filter((bill) => bill.isPaidThisMonth);
  const unpaidBills = recurringBills.filter((bill) => !bill.isPaidThisMonth);
  const dueSoonBills = recurringBills.filter(
    (bill) => bill.dueDate - new Date().getDate() < 5 && !bill.isPaidThisMonth
  );
  const paidBillsTotal = paidBills.reduce(
    (total, currentItem) => total + currentItem.paidAmountThisMonth,
    0
  );
  const unpaidBillsTotal = unpaidBills.reduce(
    (total, currentItem) => total + currentItem.lastTransactionAmount,
    0
  );
  const dueSoonBillsTotal = dueSoonBills.reduce(
    (total, currentItem) => total + currentItem.lastTransactionAmount,
    0
  );

  return (
    <div className="flex flex-col gap-5 p-5 rounded-[12px] h-[204px] bg-White w-full sm:w-1/2 lg:w-full">
      <p className="text-Grey-900 text-base font-semibold leading-[24px]">
        Summary
      </p>
      <div className="w-full">
        <div className="w-full flex items-center justify-between pb-4 border-b border-b-[#69686828]">
          <span className="text-Grey-500 text-xs leading-[18px]">
            Paid Bills
          </span>
          <span className="text-Grey-900 text-xs font-semibold leading-[18px]">
            {paidBills.length} (${paidBillsTotal.toFixed(2)})
          </span>
        </div>
        <div className="w-full flex items-center justify-between py-4 border-b border-b-[#69686828]">
          <span className="text-Grey-500 text-xs leading-[18px]">
            Total Upcoming
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-Grey-900 text-xs font-semibold leading-[18px]">
                {unpaidBills.length} (${unpaidBillsTotal.toFixed(2)})
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Estimated from previous month's amounts</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-full flex items-center justify-between pt-4">
          <span className="text-Red text-xs leading-[18px]">Due Soon</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-Red text-xs font-semibold leading-[18px]">
                {dueSoonBills.length} (${dueSoonBillsTotal.toFixed(2)})
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Estimated from previous month's amounts</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default RecurringBillsSummary;
