import type { RecurringBill } from "@/lib/types";
import OverviewCardHeader from "./OverviewCardHeader";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function RecurringBillsOverviewCard({
  recurringBills,
}: {
  recurringBills: RecurringBill[] | undefined;
}) {
  const paidBills = recurringBills?.filter((bill) => bill.isPaidThisMonth);
  const unpaidBills = recurringBills?.filter((bill) => !bill.isPaidThisMonth);
  const dueSoonBills = recurringBills?.filter(
    (bill) => bill.dueDate - new Date().getDate() < 5 && !bill.isPaidThisMonth
  );
  const paidBillsTotal = paidBills?.reduce(
    (total, currentItem) => total + currentItem.paidAmountThisMonth,
    0
  );
  const unpaidBillsTotal = unpaidBills?.reduce(
    (total, currentItem) => total + currentItem.lastTransactionAmount,
    0
  );
  const dueSoonBillsTotal = dueSoonBills?.reduce(
    (total, currentItem) => total + currentItem.lastTransactionAmount,
    0
  );

  return (
    <div
      className={`px-5 py-6 flex flex-col gap-5 sm:gap-8 sm:p-8 bg-white rounded-[12px] ${
        recurringBills?.length ? "h-[311px] sm:h-[327px]" : ""
      } lg:flex-1`}
    >
      <OverviewCardHeader label="Recurring Bills" url="/recurringBills" />
      {recurringBills?.length ? (
        <div className="flex flex-col gap-4 w-full flex-1">
          <div className="rounded-[8px] flex w-full h-1/3 overflow-hidden bg-Beige-100">
            <div className="bg-Green w-1"></div>
            <div className="flex items-center justify-between py-5 px-4 flex-1">
              <span className="text-sm text-Grey-500 leading-[21px]">
                Paid Bills
              </span>
              <span className="text-sm text-Grey-900 font-semibold leading-[21px]">
                ${paidBillsTotal?.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="rounded-[8px] flex w-full h-1/3 overflow-hidden bg-Beige-100">
            <div className="bg-Yellow w-1"></div>
            <div className="flex items-center justify-between py-5 px-4 flex-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm text-Grey-500 leading-[21px]">
                    Total Upcoming
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated from previous month's amounts</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-sm text-Grey-900 font-semibold leading-[21px]">
                ${unpaidBillsTotal?.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="rounded-[8px] flex w-full h-1/3 overflow-hidden bg-Beige-100">
            <div className="bg-Cyan w-1"></div>
            <div className="flex items-center justify-between py-5 px-4 flex-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="text-sm text-Grey-500 leading-[21px]">
                    Due Soon
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Estimated from previous month's amounts</p>
                </TooltipContent>
              </Tooltip>
              <span className="text-sm text-Grey-900 font-semibold leading-[21px]">
                ${dueSoonBillsTotal?.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <p className="py-10 text-sm text-Grey-500 rounded-[12px] border border-Beige-100 text-center">
          You haven't added any Recurring Bills yet.
        </p>
      )}
    </div>
  );
}

export default RecurringBillsOverviewCard;
