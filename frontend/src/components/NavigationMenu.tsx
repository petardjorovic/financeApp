import NavMenuItem from "./NavMenuItem";
import iconOverview from "../assets/images/icon-nav-overview.svg";
import iconTransactions from "../assets/images/icon-nav-transactions.svg";
import iconBudgets from "../assets/images/icon-nav-budgets.svg";
import iconPots from "../assets/images/icon-nav-pots.svg";
import iconRecurringBills from "../assets/images/icon-nav-recurring-bills.svg";
import iconProfile from "../assets/images/icon-user.svg";
import activeOverview from "../assets/images/active-icon-overview.svg";
import activeBudgets from "../assets/images/active-icon-budget.svg";
import activeTransactions from "../assets/images/active-icon-Transaction.svg";
import activeRecurringBills from "../assets/images/active-icon-RecurringBills.svg";
import activePots from "../assets/images/active-icon-Pots.svg";
import activeProfile from "../assets/images/active-icon-user.svg";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { useLogout } from "@/queryHooks/useLogout";

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
  {
    to: "/profile",
    icon: iconProfile,
    label: "Profile",
    activeIcon: activeProfile,
  },
];

function NavigationMenu({ collapse }: { collapse: boolean }) {
  const { signOut } = useLogout();
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
      <div
        className={`${
          collapse ? "w-[80px]" : "w-[276px]"
        } h-[56px] mt-6 flex justify-start items-center px-8 py-4 rounded-r-[16px] border-l-5 gap-x-4 border-l-Grey-900 cursor-pointer
      `}
        onClick={() => signOut()}
      >
        <LogOut
          className="w-[18px] h-[18px] min-h-[18px] min-w-[18px]"
          color="#b3b3b3"
        />
        <AnimatePresence>
          {!collapse && (
            <motion.p
              className={`text-base font-bold text-Grey-300`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.1 }}
            >
              Log out
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default NavigationMenu;
