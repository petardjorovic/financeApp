import { CREATED, OK } from "../constants/http.js";
import { addBudgetSchema } from "../schemas/budget.schemas.js";
import { addBudget, getBudgetsWithSpent } from "../services/budget.service.js";
import catchErrors from "../utils/catchErrors.js";

export const getBudgetsHandler = catchErrors(async (req, res) => {
  const budgetsWithSpent = await getBudgetsWithSpent(req.userId);

  return res.status(OK).json(budgetsWithSpent);
});

export const addBudgetHandler = catchErrors(async (req, res) => {
  // validate request
  const request = addBudgetSchema.parse(req.body);

  // call service
  const { budget } = await addBudget({ ...request, userId: req.userId });

  // return response
  return res
    .status(CREATED)
    .json({ message: "Budget successfully added", budget });
});
