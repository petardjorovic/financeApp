import OverviewCardHeader from "./OverviewCardHeader";
import type { Pot } from "@/lib/types";
import potsOverviewIcon from "../assets/images/pots overview icon.svg";

function PotsOverviewCard({ pots }: { pots: Pot[] | undefined }) {
  const totalSaved = pots
    ?.map((pot) => pot.currentAmount)
    .reduce((total, curr) => total + curr, 0);

  return (
    <div className="px-5 py-6 flex flex-col gap-5 sm:p-8 bg-white rounded-[12px]">
      {/* Pots Title */}
      <OverviewCardHeader label="Pots" url="/pots" />
      {/* Pots content */}
      {pots?.length ? (
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Total saved */}
          <div className="bg-Beige-100 rounded-[12px] p-4 flex gap-4 w-full sm:max-w-[247px] min-h-[110px] items-center">
            <img
              src={potsOverviewIcon}
              alt="pots icon"
              className="w-[26.9px] h-[34.4px]"
            />
            <div className="flex flex-col gap-[11px]">
              <span className="text-sm text-Grey-500 leading-[21px]">
                Total Saved
              </span>
              <span className="text-[32px] text-Grey-900 font-bold leading-[38px]">
                ${totalSaved}
              </span>
            </div>
          </div>
          {/* Savings Small */}
          <div className="flex flex-col gap-4 sm:flex-1">
            <div className="w-full grid grid-cols-2 items-center gap-4">
              {pots?.map((pot) => (
                <div key={pot._id} className="flex items-center gap-4">
                  <div
                    className="h-[43px] w-1 rounded-[8px]"
                    style={{ backgroundColor: `${pot.themeId.color}` }}
                  ></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs leading-[18px] text-Grey-500">
                      {pot.name}
                    </span>
                    <span className="text-Grey-900 text-sm font-semibold leading-[21px]">
                      ${pot.target}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="py-10 text-sm text-Grey-500 border border-Beige-100 rounded-[12px] text-center">
          You haven't added any Pots yet.
        </p>
      )}
    </div>
  );
}

export default PotsOverviewCard;
