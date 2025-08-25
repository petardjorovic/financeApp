import NavMiniMenuItem from "./NavMiniMenuItem";
import iconOverview from "../assets/images/icon-nav-overview.svg";
import iconTransactions from "../assets/images/icon-nav-transactions.svg";
import iconBudgets from "../assets/images/icon-nav-budgets.svg";
import iconPots from "../assets/images/icon-nav-pots.svg";
import iconRecurringBills from "../assets/images/icon-nav-recurring-bills.svg";
import activeOverview from "../assets/images/active-icon-overview.svg";
import activeTransactions from "../assets/images/active-icon-Transaction.svg";
import activeBudgets from "../assets/images/active-icon-budget.svg";
import activePots from "../assets/images/active-icon-Pots.svg";
import activeRecurringBills from "../assets/images/active-icon-RecurringBills.svg";

const navItems = [
  {
    to: "/",
    icon: iconOverview,
    label: "Overview",
    activeIcon: activeOverview,
  },
  {
    to: "/transactions",
    icon: iconTransactions,
    label: "Transactions",
    activeIcon: activeTransactions,
  },
  {
    to: "/budgets",
    icon: iconBudgets,
    label: "Budgets",
    activeIcon: activeBudgets,
  },
  {
    to: "/pots",
    icon: iconPots,
    label: "Pots",
    activeIcon: activePots,
  },
  {
    to: "/recurringbills",
    icon: iconRecurringBills,
    label: "Recurring Bills",
    activeIcon: activeRecurringBills,
  },
];

function MiniNavigation() {
  return (
    <div className="md:hidden h-[74px] flex justify-between w-full bg-Grey-900 px-4 sm:px-10 pt-2 rounded-t-[8px] mt-auto">
      {navItems.map((item) => (
        <NavMiniMenuItem
          key={item.label}
          activeIcon={item.activeIcon}
          icon={item.icon}
          label={item.label}
          to={item.to}
        />
      ))}
    </div>
  );
}

export default MiniNavigation;
