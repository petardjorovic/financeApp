import OverviewSummary from "@/components/OverviewSummary";

function Overview() {
  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[26px] leading-[31px] sm:text-[32px] sm:leading-[38px] font-bold text-Grey-900">
          Overview
        </h1>
      </div>
      {/* Summary */}
      <OverviewSummary />

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Left side */}
        <div>
          {/* Pots */}
          <div></div>
          {/* Transactions */}
          <div></div>
        </div>

        {/* Right side */}
        <div>
          {/* Budgets */}
          <div></div>
          {/* RecurringBills */}
          <div></div>
        </div>
      </div>
    </main>
  );
}

export default Overview;
