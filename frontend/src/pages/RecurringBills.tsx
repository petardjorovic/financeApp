import RecurringBillsSummary from "@/components/RecurringBillsSummary";
import TotalRecurringBills from "@/components/TotalRecurringBills";
import { Button } from "@/components/ui/button";

function RecurringBills() {
  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[28px] leading-[32px] sm:text-[32px] sm:leading-[38px] font-bold text-Grey-900">
          Recurring Bills
        </h1>
        <Button className="bg-Grey-900 text-White rounded-[8px] p-3 sm:p-4 text-xs leading-[18px] sm:text-sm sm:font-semibold sm:leading-[21px] sm:h-[53px] hover:bg-Grey-500 transition-colors duration-300 cursor-pointer">
          Add Recurring Bill
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left side */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-6 w-full lg:w-[337px]">
          <TotalRecurringBills />
          <RecurringBillsSummary />
        </div>
        {/* Right side */}
        <div></div>
      </div>
    </main>
  );
}

export default RecurringBills;
