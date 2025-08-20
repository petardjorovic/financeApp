const getSortByTerm = (sort: string) => {
  let sortBy: Record<string, 1 | -1>;
  switch (sort) {
    case "Latest":
      sortBy = { dueDate: 1 };
      break;
    case "Oldest":
      sortBy = { dueDate: -1 };
      break;
    case "A-Z":
      sortBy = { name: 1 };
      break;
    case "Z-A":
      sortBy = { name: -1 };
      break;
    case "Highest":
      sortBy = { amount: -1 };
      break;
    case "Lowest":
      sortBy = { amount: 1 };
      break;
    default:
      sortBy = { dueDate: -1 };
  }

  return sortBy;
};

export default getSortByTerm;
