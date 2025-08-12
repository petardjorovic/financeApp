import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import TransactionModel from "../models/transaction.model.js";
import { TransactionDTO } from "../types/transaction.types.js";

type GetTransactionsReturn = {
  transactions: TransactionDTO[];
  total: number;
  pageNum: number;
  pages: number;
  limit: number;
};

type GetTransactionsParams = {
  page: number;
  filter?: string | undefined;
  sort?: "Latest" | "Oldest" | "A-Z" | "Z-A" | "Highest" | "Lowest" | undefined;
  search?: string | undefined;
  userId: mongoose.Types.ObjectId;
};

export const getTransactionsData = async ({
  page,
  filter,
  sort,
  search,
  userId,
}: GetTransactionsParams): Promise<GetTransactionsReturn> => {
  const limit = 10;
  const skip = (page - 1) * limit;

  const query: Record<string, any> = { userId: userId };

  if (filter && filter.trim()) {
    const category = await CategoryModel.findOne({ name: filter }).lean();
    if (category) {
      query.categoryId = category._id;
    }
  }

  if (search) {
    query.account = { $regex: search, $options: "i" };
  }

  const sortMap: Record<string, Record<string, 1 | -1>> = {
    Latest: { date: -1 },
    Oldest: { date: 1 },
    "A-Z": { account: 1 },
    "Z-A": { account: -1 },
    Highest: { amount: -1 },
    Lowest: { amount: 1 },
  };

  const sortQuery = sortMap[sort as string] || { date: -1 };

  const [transactions, total] = await Promise.all([
    TransactionModel.find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .populate({ path: "categoryId", select: "name" })
      .lean(),
    TransactionModel.countDocuments(query),
  ]);

  return {
    transactions,
    total,
    pageNum: page,
    pages: Math.ceil(total / limit),
    limit,
  };
};
