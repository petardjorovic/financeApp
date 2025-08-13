import { de } from "zod/locales";
import { CREATED, NOT_FOUND, OK } from "../constants/http.js";
import BudgetModel from "../models/budget.model.js";
import {
  addBudgetSchema,
  budgetIdSchema,
  editBudgetSchema,
} from "../schemas/budget.schemas.js";
import {
  addBudget,
  editBudget,
  getBudgetsWithSpent,
} from "../services/budget.service.js";
import appAssert from "../utils/appAssert.js";
import catchErrors from "../utils/catchErrors.js";

export const getBudgetsHandler = catchErrors(async (req, res) => {
  const { budgetsWithSpent } = await getBudgetsWithSpent(req.userId);

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

export const editBudgetHandler = catchErrors(async (req, res) => {
  // validate request
  const budgetId = budgetIdSchema.parse(req.params.id);
  const request = editBudgetSchema.parse(req.body);

  // call service
  const { updatedBudget } = await editBudget({
    ...request,
    budgetId,
    userId: req.userId,
  });

  return res
    .status(OK)
    .json({ message: "Budget successfully updated", budget: updatedBudget });
});

export const deleteBudgetHandler = catchErrors(async (req, res) => {
  // validate request
  const budgetId = budgetIdSchema.parse(req.params.id);

  const deleted = await BudgetModel.findOneAndDelete({
    _id: budgetId,
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Budget not found");

  return res.status(OK).json({ message: "Budget removed" });
});
