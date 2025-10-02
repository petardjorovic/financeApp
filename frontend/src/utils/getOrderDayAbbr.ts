export const getOrderDayAbbr = (dayInMonth: number): string => {
  if (dayInMonth > 31 || dayInMonth < 1)
    throw new Error("dayInMonth must be between 1 and 31");
  if (dayInMonth === 1 || dayInMonth === 21 || dayInMonth === 31) return "st";
  if (dayInMonth === 2 || dayInMonth === 22) return "nd";
  if (dayInMonth === 3 || dayInMonth === 23) return "rd";
  return "th";
};
