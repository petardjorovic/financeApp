import mongoose from "mongoose";
import CategoryModel from "../models/category.model.js";
import TransactionModel from "../models/transaction.model.js";
import { TransactionDTO } from "../types/transaction.types.js";
import appAssert from "../utils/appAssert.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.js";

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

type AddTransactionParams = {
  type: "income" | "expense";
  amount: number;
  account: string;
  categoryId: string;
  date: string;
  isRecurring?: boolean | undefined;
  dueDate?: number | undefined;
  userId: mongoose.Types.ObjectId;
};

export const addTransaction = async (request: AddTransactionParams) => {
  const categoryExists = await CategoryModel.exists({
    _id: request.categoryId,
  });
  appAssert(categoryExists, BAD_REQUEST, "Category not found");
  const transaction = await TransactionModel.create(request);

  return {
    transaction: { ...transaction.toObject() },
  };
};

type UpdateTransactionParams = {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  type: "income" | "expense";
  amount: number;
  account: string;
  categoryId: string;
  date: string;
  isRecurring?: boolean | undefined;
  dueDate?: number | undefined;
};

export const updateTransaction = async (request: UpdateTransactionParams) => {
  const { transactionId, userId, ...upadateData } = request;
  const transaction = await TransactionModel.findOneAndUpdate(
    { _id: transactionId, userId },
    { $set: upadateData },
    { new: true }
  );
  appAssert(transaction, NOT_FOUND, "Transaction not found");

  return {
    transaction: { ...transaction.toObject() },
  };
};

type EditTransactionParams = {
  transactionId: string;
  userId: mongoose.Types.ObjectId;
  type?: "income" | "expense" | undefined;
  amount?: number | undefined;
  account?: string | undefined;
  categoryId?: string | undefined;
  date?: string | undefined;
  isRecurring?: boolean | undefined;
  dueDate?: number | undefined;
};

export const editTransaction = async (request: EditTransactionParams) => {
  const { transactionId, userId, ...editData } = request;
  const transaction = await TransactionModel.findOneAndUpdate(
    { _id: transactionId, userId },
    { $set: editData },
    { new: true }
  );

  appAssert(transaction, NOT_FOUND, "Transaction not found");

  return {
    transaction: { ...transaction.toObject() },
  };
};
