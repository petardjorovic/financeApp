import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SessionsTab from "@/components/SessionsTab";
import UserInfo from "@/components/UserInfo";

function Profile() {
  const [activeTab, setActiveTab] = useState<"userInfo" | "sessions">(
    "userInfo"
  );

  return (
    <main className="px-4 py-6 sm:px-10 sm:py-8 flex flex-1 flex-col gap-8">
      <div className="w-full h-[56px] flex items-center justify-between">
        <h1 className="text-[26px] leading-[31px] sm:text-[32px] sm:leading-[38px] font-bold text-Grey-900">
          Profile
        </h1>
      </div>
      <Tabs
        defaultValue={activeTab}
        onValueChange={(v) => setActiveTab(v as "userInfo" | "sessions")}
        className="w-full"
      >
        <TabsList className="flex items-center gap-4 mx-auto sm:mx-0">
          <TabsTrigger
            value="userInfo"
            className={`w-30 rounded-xl border border-Grey-900 text-Grey-900 px-3 py-1 data-[state=active]:bg-Grey-900 data-[state=active]:text-white  ${
              activeTab !== "userInfo" ? "cursor-pointer" : ""
            }`}
          >
            User Info
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className={`w-30 px-3 py-1 rounded-xl border border-Grey-900 text-Grey-900 data-[state=active]:bg-Grey-900 data-[state=active]:text-white ${
              activeTab !== "sessions" ? "cursor-pointer" : ""
            }`}
          >
            Sessions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="userInfo" className="mt-4">
          {/* USER INFO TAB */}
          <UserInfo />
        </TabsContent>

        {/* SESSIONS TAB */}
        <TabsContent value="sessions" className="mt-4">
          <SessionsTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default Profile;
