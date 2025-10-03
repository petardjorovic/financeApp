function OverviewSummary() {
  return (
    <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-6">
      <div className="h-[111px] sm:h-[119px] rounded-[12px] p-5 flex flex-col gap-3 sm:p-6 bg-Grey-900 text-white sm:flex-1">
        <p className="text-sm leading-[21px]">Current Balance</p>
        <p className="text-[32px] leading-[38px] font-bold">$4,836.00</p>
      </div>
      <div className="h-[111px] sm:h-[119px] rounded-[12px] p-5 flex flex-col gap-3 sm:p-6 bg-white sm:flex-1">
        <p className="text-sm leading-[21px] text-Grey-500">Income</p>
        <p className="text-[32px] leading-[38px] font-bold text-Grey-900">
          $3,814.25
        </p>
      </div>
      <div className="h-[111px] sm:h-[119px] rounded-[12px] p-5 flex flex-col gap-3 sm:p-6 bg-white sm:flex-1">
        <p className="text-sm leading-[21px] text-Grey-500">Expenses</p>
        <p className="text-[32px] leading-[38px] font-bold text-Grey-900">
          $1,700.00
        </p>
      </div>
    </div>
  );
}

export default OverviewSummary;
