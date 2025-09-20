import type { Budget } from "@/lib/api";

function BudgetItem({ budget }: { budget: Budget }) {
  return <div>{budget.categoryId.name}</div>;
}

export default BudgetItem;
