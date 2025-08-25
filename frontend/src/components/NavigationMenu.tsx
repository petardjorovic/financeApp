import iconOverview from "../assets/images/icon-nav-overview.svg";
import iconTransactions from "../assets/images/icon-nav-transactions.svg";
import iconBudgets from "../assets/images/icon-nav-budgets.svg";
import iconPots from "../assets/images/icon-nav-pots.svg";
import iconRecurringBills from "../assets/images/icon-nav-recurring-bills.svg";
import activeOverview from "../assets/images/active-icon-overview.svg";
import activeBudgets from "../assets/images/active-icon-budget.svg";
import activeTransactions from "../assets/images/active-icon-Transaction.svg";
import activeRecurringBills from "../assets/images/active-icon-RecurringBills.svg";
import activePots from "../assets/images/active-icon-Pots.svg";
import NavMenuItem from "./NavMenuItem";
import { SquareUserRound } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

function NavigationMenu({ collapse }: { collapse: boolean }) {
  const location = useLocation();
  const active = location.pathname === "/profile" ? true : false;
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
  return (
    <div className="w-full flex-1 flex flex-col gap-y-1">
      {navItems.map((item) => (
        <NavMenuItem
          key={item.label}
          collapse={collapse}
          activeIcon={item.activeIcon}
          icon={item.icon}
          label={item.label}
          to={item.to}
        />
      ))}
      <NavLink
        to={"/profile"}
        className={`transition-all duration-300 h-[56px] flex justify-start items-center gap-x-4 px-8 py-4 rounded-r-[16px] border-l-5 ${
          active ? "bg-Beige-100 border-l-Green" : "border-l-Grey-900"
        }`}
        style={{ width: collapse ? "80px" : "276px" }}
      >
        {active ? (
          <SquareUserRound
            color="#277c78"
            className="min-w-[20px] min-h-[20px] w-[20px] h-[20px]"
          />
        ) : (
          <SquareUserRound
            color="#b3b3b3"
            className="min-w-[20px] min-h-[20px] w-[20px] h-[20px]"
          />
        )}
        {!collapse && (
          <p
            className={`text-base font-bold ${
              active ? "text-Grey-900" : "text-Grey-300"
            }`}
          >
            Profile
          </p>
        )}
      </NavLink>
    </div>
  );
}

export default NavigationMenu;
