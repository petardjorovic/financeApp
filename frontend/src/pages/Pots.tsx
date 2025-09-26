import PotItem from "@/components/PotItem";
import { Button } from "@/components/ui/button";

function Pots() {
  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Pots
        </h1>
        <Button className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[53px]">
          + Add New Pot
        </Button>
      </div>
      {/* Pots items  */}
      <div>
        <PotItem />
      </div>
    </main>
  );
}

export default Pots;
