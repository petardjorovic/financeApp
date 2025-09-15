import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRecurringTransactionForm from "@/components/AddRecurringTransactionForm";
import AddRegularTransactionForm from "@/components/AddRegularTransactionForm";

function AddTransaction() {
  const [isRecurringTx, setIsRecurringTx] = useState<boolean>(false);

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Add Transaction
        </h1>
      </div>
      <Tabs defaultValue="regular" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-2 bg-Grey-300 rounded-sm p-1">
          <TabsTrigger
            value="regular"
            className={`w-auto rounded-sm ${!isRecurringTx ? "bg-White" : ""}`}
            onClick={() => setIsRecurringTx(false)}
          >
            Regular tx
          </TabsTrigger>
          <TabsTrigger
            value="recurring"
            className={`w-auto rounded-sm ${isRecurringTx ? "bg-White" : ""}`}
            onClick={() => setIsRecurringTx(true)}
          >
            Recurring tx
          </TabsTrigger>
        </TabsList>
        <TabsContent value="regular" className="mt-4">
          {/* REGULAR FORM */}
          <div>
            <AddRegularTransactionForm />
          </div>
        </TabsContent>

        {/* RECURRING FORM */}
        <TabsContent value="recurring" className="mt-4">
          <AddRecurringTransactionForm />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default AddTransaction;
