import { getSessions } from "@/lib/api";
import type { Session } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export const SESSIONS = "sessions";

export const useSessions = () => {
  const { data: sessions, ...rest } = useQuery<Session[], Error>({
    queryKey: [SESSIONS],
    queryFn: getSessions,
  });

  return { sessions, ...rest };
};
