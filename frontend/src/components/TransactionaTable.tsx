import type { Transaction } from "@/lib/api";

function TransactionaTable({ transactions }: { transactions: Transaction[] }) {
  return (
    <table>
      <div className="h-[42px] px-4 py-3 border-b border-b-Grey-100 w-full gap-x-[32px] items-center flex justify-between">
        <p className="text-xs font-normal leading-[18px] text-Grey-500 w-[272px] lg:max-w-[428px] h-[18px] text-left border">
          Recipient / Sender
        </p>
        <p className="text-xs font-normal leading-[18px] w-[80px] lg:w-[120px] text-Grey-500 h-[18px] text-left border">
          Category
        </p>
        <p className="text-xs font-normal leading-[18px] w-[88px] lg:w-[120px] text-Grey-500 h-[18px] text-left border">
          Transaction Date
        </p>
        <p className="text-xs font-normal leading-[18px] w-[88px] lg:w-[200px] text-Grey-500 h-[18px] text-right border">
          Amount
        </p>
      </div>
    </table>
  );
}

export default TransactionaTable;
