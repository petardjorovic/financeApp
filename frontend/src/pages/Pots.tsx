import AddPotForm from "@/components/AddPotForm";
import PotItem from "@/components/PotItem";
import PotMoreMenu from "@/components/PotMoreMenu";
import { Button } from "@/components/ui/button";
import { useCurrentBalance } from "@/queryHooks/useCurrentBalance";
import { usePots } from "@/queryHooks/usePots";
import { useThemes } from "@/queryHooks/useThemes";
import { Loader2 } from "lucide-react";
import { useState } from "react";

function Pots() {
  const [isAddPotOpen, setIsAddPotOpen] = useState<boolean>(false);
  const { pots, isPending: isPotsLoading, isError: isPotsError } = usePots();
  const { isPending: isThemesLoading, isError: isThemesError } = useThemes();
  const {
    currentBalance,
    isPending: isCurrentBalanceLoading,
    isError: isCurrentBalanceError,
  } = useCurrentBalance();
  const isLoadingAll =
    isPotsLoading || isThemesLoading || isCurrentBalanceLoading;
  const isErrorAll = isPotsError || isThemesError || isCurrentBalanceError;

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      {/* Header */}
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Pots
        </h1>
        <Button
          onClick={() => setIsAddPotOpen(true)}
          className="bg-Grey-900 text-White rounded-[8px] p-4 text-xs sm:text-sm font-semibold leading-[21px] cursor-pointer h-[53px] hover:bg-Grey-500 transition-colors duration-300"
        >
          + Add New Pot
        </Button>
      </div>
      {/* Pots items  */}
      {isLoadingAll ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : isErrorAll ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
          <p>Failed to load data.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {pots?.map((pot) => (
            <PotItem key={pot._id} pot={pot} currentBalance={currentBalance}>
              <PotMoreMenu key={pot._id} pot={pot} pots={pots} />
            </PotItem>
          ))}
        </div>
      )}

      <AddPotForm
        isAddPotOpen={isAddPotOpen}
        setIsAddPotOpen={setIsAddPotOpen}
        pots={pots}
      />
    </main>
  );
}

export default Pots;
