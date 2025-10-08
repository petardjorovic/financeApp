export const getStartDate = (range: "1m" | "6m" | "all") => {
  const now = new Date();
  const start = new Date(now);

  if (range === "1m") start.setMonth(start.getMonth() - 1);
  else if (range === "6m") start.setMonth(start.getMonth() - 6);
  else if (range === "all") return new Date(0);

  return start;
};
