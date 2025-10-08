import { OK } from "../constants/http.js";
import { getOverviewIncomeExpenseDataSchema } from "../schemas/overview.schemas.js";
import {
  getCurrentBalance,
  getIncomeExpenseChartData,
  getOverviewData,
} from "../services/overview.service.js";
import catchErrors from "../utils/catchErrors.js";

export const getOverviewDataHandler = catchErrors(async (req, res) => {
  // call service
  const { transactions, pots, budgets, recurringBills, totalBalance } =
    await getOverviewData(req.userId);

  // return response
  return res.status(OK).json({
    transactions,
    pots,
    budgets,
    recurringBills,
    totalBalance,
  });
});

export const getCurrentBalanceHandler = catchErrors(async (req, res) => {
  // call service
  const currentBalance = await getCurrentBalance(req.userId);

  // return response
  return res.status(OK).json({ currentBalance });
});

export const getIncomeExpenseDataHandler = catchErrors(async (req, res) => {
  // validate request
  const queryData = getOverviewIncomeExpenseDataSchema.parse(req.query);

  // call service
  const { data } = await getIncomeExpenseChartData({
    period: queryData.period,
    range: queryData.range,
    userId: req.userId,
  });

  // return response
  return res.status(OK).json(data);
});
