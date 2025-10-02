function RecurringBillsSummary() {
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
            4 ($190.00)
          </span>
        </div>
        <div className="w-full flex items-center justify-between py-4 border-b border-b-[#69686828]">
          <span className="text-Grey-500 text-xs leading-[18px]">
            Total Upcoming
          </span>
          <span className="text-Grey-900 text-xs font-semibold leading-[18px]">
            4 ($194.98)
          </span>
        </div>
        <div className="w-full flex items-center justify-between pt-4">
          <span className="text-Red text-xs leading-[18px]">Due Soon</span>
          <span className="text-Red text-xs font-semibold leading-[18px]">
            2 ($59.98)
          </span>
        </div>
      </div>
    </div>
  );
}

export default RecurringBillsSummary;
