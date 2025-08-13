import mongoose from "mongoose";
import BudgetModel from "../models/budget.model.js";
import appAssert from "../utils/appAssert.js";
import { CONFLICT } from "../constants/http.js";

type AddBudgetParams = {
  categoryId: string;
  limit: number;
  themeId: string;
  userId: mongoose.Types.ObjectId;
};

export const addBudget = async ({
  categoryId,
  limit,
  themeId,
  userId,
}: AddBudgetParams) => {
  // check weather budget already exist
  const existingBudget = await BudgetModel.exists({
    userId,
    $or: [{ categoryId }, { themeId }],
  });
  appAssert(
    !existingBudget,
    CONFLICT,
    "Budget for this category or with this theme already exists"
  );

  const budget = await BudgetModel.create({
    userId,
    categoryId,
    limit,
    themeId,
  });

  return {
    budget: { ...budget.toObject() },
  };
};
