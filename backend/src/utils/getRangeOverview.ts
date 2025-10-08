export const getOverviewRange = (period: "daily" | "monthly" | "yearly") => {
  let groupId: any = {};
  switch (period) {
    case "daily":
      groupId = {
        year: { $year: "$date" },
        month: { $month: "$date" },
        day: { $dayOfMonth: "$date" },
      };
      break;
    case "monthly":
      groupId = {
        year: { $year: "$date" },
        month: { $month: "$date" },
      };
      break;
    case "yearly":
      groupId = { year: { $year: "$date" } };
      break;
  }

  return groupId;
};
