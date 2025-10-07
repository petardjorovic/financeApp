import { OK } from "../constants/http.js";
import {
  getCurrentBalance,
  getOverviewData,
} from "../services/overview.service.js";
import catchErrors from "../utils/catchErrors.js";

export const getOverviewDataHandler = catchErrors(async (req, res) => {
  // call service
  const {
    transactions,
    pots,
    budgets,
    recurringBills,
    totalBalance,
    chartData,
  } = await getOverviewData(req.userId);

  return res
    .status(OK)
    .json({
      transactions,
      pots,
      budgets,
      recurringBills,
      totalBalance,
      chartData,
    });
});

export const getCurrentBalanceHandler = catchErrors(async (req, res) => {
  // call service
  const currentBalance = await getCurrentBalance(req.userId);

  // return response
  return res.status(OK).json({ currentBalance });
});
