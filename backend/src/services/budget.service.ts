import mongoose from "mongoose";
import BudgetModel from "../models/budget.model.js";
import appAssert from "../utils/appAssert.js";
import { CONFLICT, NOT_FOUND } from "../constants/http.js";
import TransactionModel from "../models/transaction.model.js";
import TranasctionTypes from "../constants/TransactionTypes.js";
import { endOfMonth, startOfMonth } from "../utils/date.js";
import { BudgetWithSpent, BudgetWithSpentRaw } from "../types/budget.type.js";
import CategoryModel from "../models/category.model.js";
import ThemeModel from "../models/theme.model.js";

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

export const getBudgetsWithSpent = async (userId: mongoose.Types.ObjectId) => {
  const budgets = await BudgetModel.find({ userId })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "themeId", select: "name" })
    .lean<BudgetWithSpentRaw[]>(); //! potencijalni problem oko type

  // Dobijamo sumu po categoryId za sve transakcije ovog meseca
  const spentData: { _id: mongoose.Types.ObjectId; total: number }[] =
    await TransactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: TranasctionTypes.Expense,
          date: { $gte: startOfMonth(), $lte: endOfMonth() },
        },
      },
      {
        $group: {
          _id: "$categoryId",
          total: { $sum: "$amount" },
        },
      },
    ]);

  // Mapiranje iz categoryId u total za brži pristup
  const spentMap: Record<string, number> = {};
  spentData.forEach((item) => {
    spentMap[item._id.toString()] = item.total;
  });

  const budgetsWithSpent = budgets.map((b) => ({
    ...b,
    spent: (spentMap[b.categoryId._id.toString()] || 0) * -1,
  }));

  return { budgetsWithSpent };
};

type EditBudgetParams = {
  categoryId?: string | undefined;
  limit?: number | undefined;
  themeId?: string | undefined;
  userId: mongoose.Types.ObjectId;
  budgetId: string;
};

export const editBudget = async ({
  categoryId,
  limit,
  themeId,
  userId,
  budgetId,
}: EditBudgetParams) => {
  const orCondition: any[] = [];
  if (categoryId) {
    const existingCategory = await CategoryModel.exists({ _id: categoryId });
    appAssert(existingCategory, NOT_FOUND, "Category not found");
    orCondition.push({ categoryId });
  }
  if (themeId) {
    const existingTheme = await ThemeModel.exists({ _id: themeId });
    appAssert(existingTheme, NOT_FOUND, "Theme not found");
    orCondition.push({ themeId });
  }

  if (orCondition.length > 0) {
    const existingBudget = await BudgetModel.exists({
      userId,
      _id: { $ne: budgetId },
      $or: orCondition,
    });
    appAssert(
      !existingBudget,
      CONFLICT,
      "Theme or category are already in use"
    );
  }

  const updatedBudget = await BudgetModel.findOneAndUpdate(
    { _id: budgetId, userId },
    {
      $set: {
        ...(typeof categoryId !== "undefined" && { categoryId }),
        ...(typeof limit !== "undefined" && { limit }),
        ...(typeof themeId !== "undefined" && { themeId }),
      },
    },
    {
      new: true,
    }
  );
  appAssert(updatedBudget, NOT_FOUND, "Budget not found");

  return { updatedBudget: { ...updatedBudget.toObject() } };
};
