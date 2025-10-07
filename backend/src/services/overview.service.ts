import mongoose from "mongoose";
import TransactionModel from "../models/transaction.model.js";
import appAssert from "../utils/appAssert.js";
import PotModel from "../models/pot.model.js";
import BudgetModel from "../models/budget.model.js";
import { BudgetWithSpentRaw } from "../types/budget.type.js";
import { endOfMonth, startOfMonth } from "../utils/date.js";
import TransactionTypes from "../constants/TransactionTypes.js";
import RecurringBillModel from "../models/recurringBill.js";

type TransactionDocument = {
  _id: string;
  userId: string;
  type: "income" | "expense";
  amount: number;
  account: string;
  categoryId: string;
  date: string;
  recurringBillId?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type PotDocument = {
  _id: string;
  userId: string;
  name: string;
  target: number;
  currentAmount: number;
  themeId: {
    _id: string;
    name: string;
    color: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const getOverviewData = async (userId: mongoose.Types.ObjectId) => {
  const start = startOfMonth();
  const end = endOfMonth();
  const budgetsRaw = await BudgetModel.find({ userId })
    .populate({ path: "categoryId", select: "name" })
    .populate({ path: "themeId", select: "name color" })
    .lean<BudgetWithSpentRaw[]>(); //! potencijalni problem oko type

  const categoryIds = budgetsRaw.map((b) => b.categoryId._id);

  const [
    transactions,
    pots,
    budgetsTotal,
    recurringBills,
    balanceResult,
    chartData,
  ] = await Promise.all([
    TransactionModel.find({ userId, type: { $in: ["income", "expense"] } })
      .sort({ date: -1 })
      .limit(5)
      .lean<TransactionDocument[]>(),
    PotModel.find({ userId })
      .populate({
        path: "themeId",
        select: "name color",
      })
      .lean<PotDocument[]>(),
    TransactionModel.aggregate([
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
                  $and: [{ $gte: ["$date", start] }, { $lte: ["$date", end] }],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          spentThisMonth: 1,
        },
      },
    ]),
    RecurringBillModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "transactions",
          let: { billId: "$_id", userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $eq: ["$recurringBillId", "$$billId"] },
                    { $gte: ["$date", start] },
                    { $lte: ["$date", end] },
                  ],
                },
              },
            },
            { $group: { _id: null, totalPaid: { $sum: "$amount" } } },
          ],
          as: "paidData",
        },
      },
      {
        $lookup: {
          from: "transactions",
          let: { billId: "$_id", userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$userId", "$$userId"] },
                    { $eq: ["$recurringBillId", "$$billId"] },
                    { $lt: ["$date", start] }, // samo pre pocetka tekuceg meseca
                  ],
                },
              },
            },
            { $sort: { date: -1 } }, // poslednja pre ovog meseca
            { $limit: 1 },
            { $project: { amount: 1, date: 1, _id: 0 } },
          ],
          as: "lastTransactionBeforeThisMonth",
        },
      },
      {
        $addFields: {
          isPaidThisMonth: { $gt: [{ $size: "$paidData" }, 0] },
          paidAmountThisMonth: {
            $ifNull: [{ $arrayElemAt: ["$paidData.totalPaid", 0] }, 0],
          },
          lastTransactionAmount: {
            $ifNull: [
              { $arrayElemAt: ["$lastTransactionBeforeThisMonth.amount", 0] },
              0,
            ],
          },
          lastTransactionDate: {
            $ifNull: [
              { $arrayElemAt: ["$lastTransactionBeforeThisMonth.date", 0] },
              null,
            ],
          },
        },
      },
      { $project: { paidData: 0, lastTransactionBeforeThisMonth: 0 } },
      { $sort: { dueDate: 1 } },
    ]),
    TransactionModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: "$userId",
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          withdraw: {
            $sum: { $cond: [{ $eq: ["$type", "withdraw"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
          deposit: {
            $sum: { $cond: [{ $eq: ["$type", "deposit"] }, "$amount", 0] },
          },
        },
      },
      {
        $addFields: {
          currentBalance: {
            $subtract: [
              { $add: ["$income", "$withdraw"] },
              { $add: ["$expense", "$deposit"] },
            ],
          },
        },
      },
    ]),
    TransactionModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
          type: { $in: ["income", "expense"] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          income: {
            $sum: { $cond: [{ $eq: ["$type", "income"] }, "$amount", 0] },
          },
          expense: {
            $sum: { $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0] },
          },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          type: 1,
          income: 1,
          expense: 1,
        },
      },
    ]),
  ]);

  const budgetsMap = new Map(
    budgetsTotal.map((b) => [b._id.toString(), b.spentThisMonth])
  );

  const budgets = budgetsRaw.map((b) => ({
    ...b,
    spent: budgetsMap.get(b.categoryId._id.toString()) ?? 0,
  }));

  const totalBalance = balanceResult[0] ?? {
    income: 0,
    expense: 0,
    withdraw: 0,
    deposit: 0,
    currentBalance: 0,
  };

  return {
    transactions,
    pots,
    budgets,
    recurringBills,
    totalBalance,
    chartData,
  };
};

export const getCurrentBalance = async (userId: mongoose.Types.ObjectId) => {
  const currentBalance = await TransactionModel.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: "$userId",
        balance: {
          $sum: {
            $switch: {
              branches: [
                { case: { $eq: ["$type", "income"] }, then: "$amount" },
                { case: { $eq: ["$type", "withdraw"] }, then: "$amount" },
                {
                  case: { $eq: ["$type", "expense"] },
                  then: { $multiply: ["$amount", -1] },
                },
                {
                  case: { $eq: ["$type", "deposit"] },
                  then: { $multiply: ["$amount", -1] },
                },
              ],
              default: 0,
            },
          },
        },
      },
    },
  ]);
  const balance = currentBalance[0]?.balance ?? 0;

  return balance;
};
