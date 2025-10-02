import recBill from "../assets/images/RecurringBill.svg";

function TotalRecurringBills({ totalBills }: { totalBills: number }) {
  return (
    <div className="px-5 py-6 md:px-6 rounded-[12px] flex flex-row items-center sm:items-start sm:flex-col gap-5 md:gap-8 bg-Grey-900 text-White w-full sm:w-1/2 lg:w-full md:h-[204px] lg:h-[190px]">
      <img
        src={recBill}
        alt="Recurring Bill Icon"
        className="w-[31.88px] h-[26.88px]"
      />
      <div className="w-full flex flex-col gap-[11px]">
        <p className="text-sm leading-[21px]">Total Bills (last month)</p>
        <p className="text-[32px] leading-[38px] font-bold">
          ${totalBills.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default TotalRecurringBills;
