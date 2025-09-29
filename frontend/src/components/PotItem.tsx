import type { Pot } from "@/lib/types";
import { Button } from "./ui/button";
import { useState } from "react";
import DepositPotForm from "./DepositPotForm";
import WithdrawPotForm from "./WithdrawPotForm";

function PotItem({
  pot,
  children,
  currentBalance,
}: {
  pot: Pot;
  children: React.ReactNode;
  currentBalance: number | undefined;
}) {
  const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState<boolean>(false);
  const progressValue = (pot.currentAmount / pot.target) * 100;

  return (
    <div className="px-5 py-6 sm:px-6 flex flex-col items-center gap-8 rounded-[12px] bg-White">
      {/* TITLE */}
      <div className="h-6 w-full flex items-center justify-between">
        <div className="h-6 flex items-center gap-4">
          <div
            className="w-4 h-4 aspect-square rounded-full"
            style={{ backgroundColor: `${pot.themeId.color}` }}
          ></div>
          <span className="text-Grey-900 text-[20px] leading-[24px] font-bold">
            {pot.name}
          </span>
        </div>
        {/* Pot more menu */}
        {children}
      </div>
      {/* POT BAR */}
      <div className="flex flex-col items-center justify-center gap-4 w-full h-[114px]">
        <div className="h-[38px] w-full flex items-center justify-between">
          <span className="text-Grey-500 text-sm leading-[21px]">
            Total Saved
          </span>
          <span className="text-2xl leading-[30px] text-Grey-900 sm:text-[32px] sm:leading-[38px] font-bold">
            $
            {pot.currentAmount > 0
              ? pot.currentAmount.toFixed(2)
              : pot.currentAmount}
          </span>
        </div>
        <div className="h-[39px] w-full space-y-[13px]">
          {/* Progress bar */}
          <div className="w-full rounded-[4px] bg-Beige-100 overflow-hidden h-2">
            <div
              className="rounded-[4px] h-full transition-[width] duration-500 ease-in-out"
              style={{
                backgroundColor: `${pot.themeId.color}`,
                width: `${progressValue}%`,
              }}
            ></div>
          </div>
          <div className="h-[18px] w-full flex items-center justify-between">
            <span className="text-Grey-500 text-xs leading-[18px] font-semibold">
              {progressValue.toFixed(2)}%
            </span>
            <span className="text-Grey-500 text-xs leading-[18px]">
              Target of ${pot.target.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* BUTTONS */}
      <div className="flex items-center gap-4 w-full">
        <Button
          onClick={() => setIsDepositOpen(true)}
          className="rounded-[8px] h-[53px] p-4 bg-Beige-100 text-Grey-900 text-sm leading-[21px] font-semibold flex-1 cursor-pointer transition-colors duration-300 hover:bg-White hover:border hover:border-Grey-500"
        >
          + Add Money
        </Button>
        <Button
          onClick={() => setIsWithdrawOpen(true)}
          className="rounded-[8px] h-[53px] p-4 bg-Beige-100 text-Grey-900 text-sm leading-[21px] font-semibold flex-1 cursor-pointer transition-colors duration-300 hover:bg-White hover:border hover:border-Grey-500"
        >
          Withdraw
        </Button>
      </div>

      {/* Deposit / Withdraw forms */}
      <DepositPotForm
        isDepositOpen={isDepositOpen}
        setIsDepositOpen={setIsDepositOpen}
        pot={pot}
        currentBalance={currentBalance}
      />

      <WithdrawPotForm
        isWithdrawOpen={isWithdrawOpen}
        setIsWithdrawOpen={setIsWithdrawOpen}
        pot={pot}
      />
    </div>
  );
}

export default PotItem;
