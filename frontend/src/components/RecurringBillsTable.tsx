import type { RecurringBill } from "@/lib/types";
import RecurringBillItemDesktop from "./RecurringBillItemDesktop";
import RecurringBillItemMobile from "./RecurringBillItemMobile";

function RecurringBillsTable({
  recurringBills,
}: {
  recurringBills: RecurringBill[];
}) {
  return (
    <div className="w-full">
      {/* DESKTOP VIEW */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-White border-b border-b-Grey-100">
            <tr>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Bill Title
              </th>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Due Date
              </th>
              <th className="text-xs font-normal leading-[18px] text-Grey-500 px-4 py-3 text-left">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {recurringBills.map((item) => (
              <RecurringBillItemDesktop recurringBill={item} key={item._id} />
            ))}
          </tbody>
        </table>
      </div>

      {/* SMALL SCREEN VIEW */}
      <div className="sm:hidden w-full">
        {recurringBills.map((item) => (
          <RecurringBillItemMobile recurringBill={item} key={item._id} />
        ))}
      </div>
    </div>
  );
}

export default RecurringBillsTable;
