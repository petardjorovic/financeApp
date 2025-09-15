import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js";
import RecurringBillModel from "../models/recurringBill.js";
import { endOfMonth, startOfMonth } from "../utils/date.js";
import getSortByTerm from "../utils/getSortByTerm.js";

type GetRecurringBillsParams = {
  sort?: "Latest" | "Oldest" | "A-Z" | "Z-A" | "Highest" | "Lowest" | undefined;
  search?: string | undefined;
  userId: mongoose.Types.ObjectId;
  raw?: string | undefined;
};

export const getRecurringBills = async ({
  sort,
  search,
  userId,
  raw,
}: GetRecurringBillsParams) => {
  if (raw === "true") {
    const recurringBills = await RecurringBillModel.find({ userId });
    return recurringBills;
  } else {
    const start = startOfMonth();
    const end = endOfMonth();
    const sortStage = getSortByTerm(sort || "Latest");
    const searchTerm = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const pipeline: mongoose.PipelineStage[] = [
      {
        $match: { userId: new mongoose.Types.ObjectId(userId), ...searchTerm },
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
        $addFields: {
          isPaidThisMonth: { $gt: [{ $size: "$paidData" }, 0] },
          paidAmountThisMonth: {
            $ifNull: [{ $arrayElemAt: ["$paidData.totalPaid", 0] }, 0],
          },
        },
      },
      { $project: { paidData: 0 } },
      { $sort: sortStage },
    ];

    const recurringBills = await RecurringBillModel.aggregate(pipeline);

    return recurringBills;
  }
};

type AddRecurringBillParams = {
  userId: mongoose.Types.ObjectId;
  name: string;
  dueDate: number;
  categoryId: string;
};

export const addRecurringBill = async ({
  name,
  dueDate,
  categoryId,
  userId,
}: AddRecurringBillParams) => {
  const category = await CategoryModel.findById(categoryId);
  appAssert(category, NOT_FOUND, "Category not found");
  appAssert(
    category.type === "expense",
    BAD_REQUEST,
    "Category must be the type of expense"
  );

  const saved = await RecurringBillModel.create({
    userId,
    name,
    dueDate,
    categoryId,
  });

  return {
    recurringBill: { ...(await saved).toObject() },
  };
};
