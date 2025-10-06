import type { Session } from "@/lib/types";
import { useDeleteSession } from "@/queryHooks/useDeleteSession";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

function SessionCard({ session }: { session: Session }) {
  const { _id, createdAt, userAgent, isCurrent } = session;

  const { delSession, isPending } = useDeleteSession();
  return (
    <div className="flex px-5 py-6 rounded-md w-full md:w-[500px] bg-Beige-100">
      <div className="flex flex-col flex-1">
        <p className="font-bold text-sm mb-2">
          {new Date(createdAt).toLocaleString("en-US")}
          {isCurrent && " (current session)"}
        </p>
        <p className="text-xs text-muted-foreground">{userAgent}</p>
      </div>

      {!isCurrent && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={"ghost"}
              className="ml-4 self-center text-xs text-Red flex items-center justify-center cursor-pointer"
              size={"sm"}
              onClick={() => delSession({ id: _id })}
              disabled={isPending}
            >
              {isPending ? <Loader2Icon className="animate-spin" /> : "❌"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete Session</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export default SessionCard;
