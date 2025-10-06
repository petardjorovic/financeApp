import SessionCard from "./SessionCard";
import { useSessions } from "@/queryHooks/useSessions";
import { Loader2 } from "lucide-react";

function SessionsTab() {
  const { sessions, isPending, isError, isSuccess } = useSessions();

  return (
    <div className="px-5 py-6 sm:px-8 sm:py-8 bg-white w-full rounded-[12px] flex flex-1 flex-col gap-y-6">
      <h1 className="text-2xl font-semibold mb-4">My Sessions</h1>
      {isPending && <Loader2 className="animate-spin" />}
      {isError && <p className="text-destructive">Failed to get sessions.</p>}
      {isSuccess && (
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
