import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRecurringTransactionForm from "@/components/AddRecurringTransactionForm";
import AddRegularTransactionForm from "@/components/AddRegularTransactionForm";

function AddTransaction() {
  const [activeTab, setActiveTab] = useState<"regular" | "recurring">(
    "regular"
  );

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[32px] leading-[38px] font-bold text-Grey-900">
          Add Transaction
        </h1>
      </div>
      <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
        <Tabs
          defaultValue={activeTab}
          onValueChange={(v) => setActiveTab(v as "regular" | "recurring")}
          className="w-full"
        >
          <TabsList className="flex items-center justify-center bg-Beige-100 rounded-sm p-1 mx-auto h-auto">
            <TabsTrigger
              value="regular"
              className={`w-30 rounded-sm px-3 py-1 ${
                activeTab === "regular" ? "bg-White" : "cursor-pointer"
              }`}
            >
              Regular tx
            </TabsTrigger>
            <TabsTrigger
              value="recurring"
              className={`w-30 px-3 py-1 rounded-sm ${
                activeTab === "recurring" ? "bg-White" : "cursor-pointer"
              }`}
            >
              Recurring tx
            </TabsTrigger>
          </TabsList>
          <TabsContent value="regular" className="mt-4">
            {/* REGULAR FORM */}
            <AddRegularTransactionForm />
          </TabsContent>

          {/* RECURRING FORM */}
          <TabsContent value="recurring" className="mt-4">
            <AddRecurringTransactionForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default AddTransaction;
