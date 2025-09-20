import type { Budget } from "@/lib/api";

function BudgetItem({ budget }: { budget: Budget }) {
  return (
    <div style={{ backgroundColor: `${budget.themeId.color}` }}>
      {budget.categoryId.name}
    </div>
  );
}

export default BudgetItem;
