import SessionCard from "./SessionCard";
import { useSessions } from "@/queryHooks/useSessions";
import { Loader2 } from "lucide-react";

function SessionsTab() {
  const { sessions, isPending, isError } = useSessions();

  return (
    <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
      <h1 className="text-2xl font-semibold mb-4">My Sessions</h1>
      {isPending ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : isError ? (
        <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
          <p>Failed to load data.</p>
        </div>
      ) : (
        <div className="flex flex-col space-y-3 items-start">
          {sessions?.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SessionsTab;
