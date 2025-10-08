export const getMonthName = (monthNumber: number | undefined) => {
  if (monthNumber === undefined)
    throw new Error("monthNumber cannot be undefined");
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months[monthNumber - 1] || "";
};
