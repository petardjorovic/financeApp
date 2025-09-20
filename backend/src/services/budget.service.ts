import mongoose from "mongoose";
import BudgetModel from "../models/budget.model.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, CONFLICT, NOT_FOUND } from "../constants/http.js";
import TransactionModel from "../models/transaction.model.js";
import { endOfMonth, startOfMonth } from "../utils/date.js";
import { BudgetWithSpentRaw } from "../types/budget.type.js";
import CategoryModel from "../models/category.model.js";
import ThemeModel from "../models/theme.model.js";
import TransactionTypes from "../constants/TransactionTypes.js";

type AddBudgetParams = {
  categoryId: string;
  limit: number;
  themeId: string;
  userId: mongoose.Types.ObjectId;
};

type Transaction = {
  _id: mongoose.Types.ObjectId;
  amount: number;
  account: string;
  date: Date;
  type: string;
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

  const [category, existingTheme] = await Promise.all([
    CategoryModel.findById(categoryId),
    ThemeModel.exists({ _id: themeId }),
  ]);
  appAssert(category, NOT_FOUND, "Category not found");
  appAssert(existingTheme, NOT_FOUND, "Theme not found");

  appAssert(
    category.type === "expense",
    BAD_REQUEST,
    "Budget can only be created for expense category"
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
    .populate({ path: "themeId", select: "name color" })
    .lean<BudgetWithSpentRaw[]>(); //! potencijalni problem oko type

  const categoryIds = budgets.map((b) => b.categoryId._id);

  const latestTransactions = await TransactionModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        type: TransactionTypes.Expense,
        categoryId: { $in: categoryIds },
      },
    },
    { $sort: { date: -1 } },
    {
      $group: {
        _id: "$categoryId",
        spentThisMonth: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $gte: ["$date", startOfMonth()] },
                  { $lte: ["$date", endOfMonth()] },
                ],
              },
              "$amount",
              0,
            ],
          },
        },
        transactions: {
          $push: {
            _id: "$_id",
            amount: "$amount",
            account: "$account",
            type: "$type",
            date: "$date",
          },
        },
      },
    },
    {
      $project: {
        spentThisMonth: 1,
        transactions: { $slice: ["$transactions", 3] },
      },
    },
  ]);

  const latestMap = latestTransactions.reduce((acc, item) => {
    acc[item._id.toString()] = {
      spent: item.spentThisMonth,
      transactions: item.transactions,
    };
    return acc;
  }, {} as Record<string, { spent: number; transactions: Transaction[] }>);

  const budgetsWithSpent = budgets.map((b) => {
    const data = latestMap[b.categoryId._id.toString()];
    return {
      ...b,
      spent: data?.spent ?? 0,
      latestSpending: data?.transactions ?? [],
    };
  });

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
    const category = await CategoryModel.findById(categoryId);
    appAssert(category, NOT_FOUND, "Category not found");
    appAssert(
      category.type === "expense",
      BAD_REQUEST,
      "Budget can only be created for expense category"
    );
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
